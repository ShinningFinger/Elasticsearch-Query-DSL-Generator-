import { ExistanceCondition } from '../type/condition'
import { ExistenceQuery } from '../type/query'
import Base, { QueryType } from './base'

export default class Exists extends Base<ExistanceCondition, ExistenceQuery> {
  generate(): ExistenceQuery {
    const { $exists } = this.condition
    let boost: number = 1
    let field: string
    if (typeof $exists === 'object') {
      boost = $exists.boost
      field = $exists.value
    } else {
      field = $exists
    }
    const query: { field: string; boost?: number } = { field }
    if (boost > 1) {
      query.boost = boost
    }
    return {
      [QueryType.EXISTENCE]: query,
    }
  }
}
