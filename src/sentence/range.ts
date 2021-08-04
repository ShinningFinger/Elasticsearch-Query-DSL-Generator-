import { RangeCondition } from '../type/condition'
import { RangeQuery } from '../type/query'
import Base from './base'

export default class Range extends Base<RangeCondition, RangeQuery> {
  generate(): RangeQuery {
    const [key, value] = Object.entries(this.condition)[0]
    const query: {
      gte?: unknown
      lte?: unknown
      gt?: unknown
      lt?: unknown
      boost?: number
    } = {}
    if (value.$gte) {
      query.gte = value.$gte
    }
    if (value.$lte) {
      query.lte = value.$lte
    }
    if (value.$gt) {
      query.gt = value.$gt
    }
    if (value.$lt) {
      query.lt = value.$lt
    }
    if (value.boost) {
      query.boost = value.boost
    }
    return {
      range: {
        [key]: query,
      },
    }
  }
}
