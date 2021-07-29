import { RangeCondition } from '../type/condition'
import { RangeQuery } from '../type/query'
import Base, { QueryType } from './base'

export default class Range extends Base<RangeCondition, RangeQuery> {
  generate() {
    const { key, condition, boost } = this
    const query: {
      gte?: unknown
      lte?: unknown
      gt?: unknown
      lt?: unknown
      boost?: number
    } = {}
    if (condition.$gte) {
      query.gte = condition.$gte
    }
    if (condition.$lte) {
      query.lte = condition.$lte
    }
    if (condition.$gt) {
      query.gt = condition.$gt
    }
    if (condition.$lt) {
      query.lt = condition.$lt
    }
    if (boost) {
      query.boost = boost
    }
    return {
      [QueryType.RANGE]: {
        [key]: query,
      },
    }
  }
}
