import { ExistanceCondition } from '../type/condition'
import { ExistenceQuery } from '../type/query'
import Base, { QueryType } from './base'

export default class Exists extends Base<ExistanceCondition, ExistenceQuery> {
  generate() {
    const { $exists } = this.condition
    let boost: number
    let field: string
    if (typeof $exists === 'object') {
      boost = $exists.boost
      field = $exists.value
    } else {
      field = $exists
    }
    return {
      [QueryType.EXISTENCE]: {
        field,
        boost,
      },
    }
  }
}
