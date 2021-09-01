/* eslint-disable import/no-cycle */
import {
  Condition,
  isConstantScoreCondition,
  isEmptyCondition,
  isExistanceCondition,
  isInCondition,
  isNotCondition,
  isOrCondition,
  isRangeCondition,
  isTermCondition,
} from '../type/condition'
import { QuerySentence } from '../type/query'
import ConstantScore from './constant-score'
import Exists from './exists'
import In from './in'
import Not from './not'
import Or from './or'
import Range from './range'
import Term from './term'

export function singleConditionParse(condition: { [key: string]: unknown }): QuerySentence {
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
  throw new Error(`Upsupported condition: ${JSON.stringify(condition)}`)
}

export function parse(condition: Condition): QuerySentence | QuerySentence[] {
  if (isEmptyCondition(condition)) {
    return { match_all: {} }
  }
  const sentences: QuerySentence[] = Object.entries(condition).map(([key, value]) =>
    singleConditionParse({ [key]: value }),
  )
  if (sentences.length === 1) {
    return sentences[0]
  }
  return sentences
}
