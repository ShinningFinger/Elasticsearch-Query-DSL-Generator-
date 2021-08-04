import * as _ from 'lodash'

export function isSingleCondition(condition: any): condition is { key: string; value: any } {
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
      (typeof value === 'object' && !!value && 'boost' in value && 'value' in value))
  )
}

export type RangeCondition = {
  [key: string]: {
    [key in '$gt' | '$gte' | '$lt' | '$lte']?: string | number
  } & { boost?: number }
}

export function isRangeCondition(condition: any): condition is RangeCondition {
  const [, value] = Object.entries(condition)[0]
  return (
    isSingleCondition(condition) &&
    typeof value === 'object' &&
    !!value &&
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
    !!value &&
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
      (typeof value === 'object' && !!value && 'boost' in value && 'value' in value))
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
    !!value &&
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
