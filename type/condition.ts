import { Bool, Must, MustNot } from "../sentence/bool";
import ConstantScore from "../sentence/constant-score";
import Exists from "../sentence/exists";
import In from "../sentence/in";
import Or from "../sentence/or";
import Range from "../sentence/range";
import Term from "../sentence/term";
import { QuerySentence } from "./query";

export type TermCondition = string | number | boolean | BoostCondition;
export function isTermCondition(data: any): data is TermCondition {
  return (
    typeof data === "string" ||
    typeof data === "number" ||
    typeof data === "boolean" ||
    (typeof data === "object" && data.value !== undefined)
  );
}

export type RangeCondition = {
  $gte?: unknown;
  $lte?: unknown;
  $gt?: unknown;
  $lt?: unknown;
};
function isRangeCondition(data: any): data is RangeCondition {
  return (
    typeof data === "object" &&
    ("$gte" in data || "$lte" in data || "$gt" in data || "$lt" in data)
  );
}

export type InCondition = { $in: (string | number | boolean)[] };
export function isInCondition(data: any): data is InCondition {
  return typeof data === "object" && Array.isArray(data.$in);
}

export type BoostCondition = { value: unknown; boost: number };

export type ConstantScoreCondition = {
  $constant: Conditions;
  boost?: number;
};
export function isConstantScoreCondition(
  data: any
): data is ConstantScoreCondition {
  return typeof data === "object" && data.$constant !== undefined;
}

export type MustNotCondition = { $not: Conditions };
export function isMustNotCondition(data: any): data is MustNotCondition {
  return typeof data === "object" && data.$not !== undefined;
}

export type ArrayCondition = { [key: string]: unknown }[];
export function isArrayCondition(data: any): data is ArrayCondition {
  return (
    Array.isArray(data) &&
    (data as unknown[]).every((e) => typeof e === "object")
  );
}

export type MapCondition = { [key: string]: Conditions };
export function isMapCondition(data: any): data is MapCondition {
  return typeof data === "object";
}

export type ExistanceCondition = { $exists: string };
export function isExistanceCondition(data: any): data is ExistanceCondition {
  return typeof data === "object" && data.$exist !== undefined;
}

export type Conditions =
  | TermCondition
  | RangeCondition
  | InCondition
  | MustNotCondition
  | ArrayCondition
  | ConstantScoreCondition
  | ExistanceCondition
  | MapCondition;

export function singleConditionParse(key: string, condition: Conditions) {
  if (key === "$or" && isArrayCondition(condition)) {
    return new Or({ key, condition }).generate();
  }

  if (key === "$exist" && typeof condition === "string") {
    return new Exists({ condition: { $exists: condition } }).generate();
  }

  if (key === "$not" && isMapCondition(condition)) {
    return new Bool({ mustNot: new MustNot(condition) }).generate();
  }

  if (isTermCondition(condition)) {
    return new Term({ key, condition }).generate();
  }

  if (isRangeCondition(condition)) {
    return new Range({ key, condition }).generate();
  }

  if (isInCondition(condition)) {
    return new In({ key, condition }).generate();
  }

  if (isExistanceCondition(condition)) {
    return new Exists({ key, condition }).generate();
  }

  if (isMustNotCondition(condition)) {
    return new Bool({
      mustNot: new MustNot({ [key]: condition.$not }),
    }).generate();
  }

  if (isConstantScoreCondition(condition)) {
    return new ConstantScore({ key, condition }).generate();
  }
}

export function conditionParse(query: {
  [key: string]: Conditions;
}): QuerySentence {
  // If query input contains only one condition, output a single object
  if (Object.keys(query).length === 1) {
    const [key, condition] = Object.entries(query)[0];
    return singleConditionParse(key, condition);
  }
  // Else, return a must query
  return new Bool({ must: new Must(query) }).generate();
}
