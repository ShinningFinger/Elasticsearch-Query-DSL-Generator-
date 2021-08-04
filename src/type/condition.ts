import * as _ from 'lodash'
import { Bool, Must } from '../sentence/bool'
import ConstantScore from '../sentence/constant-score'
import Exists from '../sentence/exists'
import In from '../sentence/in'
import Not from '../sentence/not'
import Or from '../sentence/or'
import Range from '../sentence/range'
import Term from '../sentence/term'
import { QuerySentence } from './query'

function isSingleCondition(condition: any): condition is { key: string; value: any } {
  return Object.entries(condition).length === 1
}

// Singel Condition
export type TermCondition = {
  [key: string]: string | number | boolean | { value: string | number | boolean; boost: number }
}
export function isTermCondition(condition: any): condition is TermCondition {
  const [key, value] = Object.entries(condition)[0]
  return (
    isSingleCondition(condition) &&
    !key.match(/^\$/) &&
    (typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      (typeof value === 'object' && 'boost' in value && 'value' in value))
  )
}

export type RangeCondition = {
  [key: string]: {
    [key in '$gt' | '$gte' | '$lt' | '$lte']?: string | number
  } & { boost?: number }
}
function isRangeCondition(condition: any): condition is RangeCondition {
  const [, value] = Object.entries(condition)[0]
  return (
    isSingleCondition(condition) &&
    typeof value === 'object' &&
    _.every(Object.keys(value), (k) => ['$gt', '$gte', '$lt', '$lte', 'boost'].includes(k))
  )
}

export type InCondition = {
  [key: string]: { $in: (string | number | boolean)[] }
}
export function isInCondition(condition: any): condition is InCondition {
  const [, value] = Object.entries(condition)[0]
  return (
    isSingleCondition(condition) &&
    typeof value === 'object' &&
    '$in' in value &&
    Array.isArray(_.get(value, '$in'))
  )
}

export type ExistanceCondition = { $exists: string | { value: string; boost: number } }
export function isExistanceCondition(condition: any): condition is ExistanceCondition {
  const [key, value] = Object.entries(condition)[0]
  return (
    isSingleCondition(condition) &&
    key === '$exists' &&
    (typeof value === 'string' ||
      (typeof value === 'object' && 'boost' in value && 'value' in value))
  )
}

export type OrCondition = {
  $or: Condition[]
}
export function isOrCondition(condition: any): condition is OrCondition {
  const [key] = Object.entries(condition)[0]
  return isSingleCondition(condition) && key === '$or'
}

export type NotCondition = {
  $not: Condition
}
export function isNotCondition(condition: any): condition is NotCondition {
  const [key] = Object.entries(condition)[0]
  return isSingleCondition(condition) && key === '$not'
}

export type ConstantScoreCondition = {
  $constant: { filter: Condition; boost: number }
}
export function isConstantScoreCondition(condition: any): condition is ConstantScoreCondition {
  const [key, value] = Object.entries(condition)[0]
  return (
    isSingleCondition(condition) &&
    key === '$constant' &&
    typeof value === 'object' &&
    '$filter' in value &&
    'boost' in value
  )
}

export type AndCondition = {
  [key: string]: unknown
}
export function isAndCondition(condition: any): condition is AndCondition {
  return Object.entries(condition).length > 1
}

type SingleCondition =
  | ConstantScoreCondition
  | NotCondition
  | OrCondition
  | ExistanceCondition
  | InCondition
  | RangeCondition
  | TermCondition
export type Condition = SingleCondition | AndCondition

export function singleConditionParse(condition: { [key: string]: unknown }) {
  console.log('condition :>> ', condition)
  if (isOrCondition(condition)) {
    return new Or(condition).generate()
  }
  if (isInCondition(condition)) {
    return new In(condition).generate()
  }

  if (isNotCondition(condition)) {
    return new Not(condition).generate()
  }

  if (isConstantScoreCondition(condition)) {
    return new ConstantScore(condition).generate()
  }

  if (isRangeCondition(condition)) {
    return new Range(condition).generate()
  }

  if (isTermCondition(condition)) {
    return new Term(condition).generate()
  }

  if (isExistanceCondition(condition)) {
    return new Exists(condition).generate()
  }
}

// Factory Function
export function conditionParse(query: { [key: string]: unknown }): QuerySentence {
  if (isSingleCondition(query)) {
    return singleConditionParse(query)
  }
  // And condition
  return new Bool({ must: new Must(query) }).generate()
}
