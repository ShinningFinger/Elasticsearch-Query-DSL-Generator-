import { Bool, MustNot } from "../query/bool";
import ConstantScore from "../query/constant-score";
import Exists from "../query/exists";
import In from "../query/in";
import Or from "../query/or";
import Range from "../query/range";
import Term from "../query/term";
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

export type ConstantScoreCondition = { $constant: BoostCondition };
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
  | ExistanceCondition;

export function conditionParse(
  key: string,
  data: Conditions,
  boost?: number
): QuerySentence {
  if (key === "$or" && isArrayCondition(data)) {
    return new Or(key, data).generate();
  }
  if (key === "$exist" && typeof data === "string") {
    return new Exists(key, data).generate();
  }

  if (key === "$not" && isMapCondition(data)) {
    return new Bool({ mustNot: new MustNot(data) }).generate();
  }
  if (isTermCondition(data)) {
    return new Term(key, data).generate();
  }

  if (isRangeCondition(data)) {
    return new Range(key, data).generate();
  }

  if (isInCondition(data)) {
    return new In(key, data).generate();
  }

  if (isExistanceCondition(data)) {
    return new Exists(key, data).generate();
  }

  if (isMustNotCondition(data)) {
    return new Bool({
      mustNot: new MustNot({ [key]: data.$not }),
    }).generate();
  }

  if (isConstantScoreCondition(data)) {
    return new ConstantScore(key, data, boost).generate();
  }

  throw new Error();
}
