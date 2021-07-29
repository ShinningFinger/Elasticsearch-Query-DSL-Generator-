import { ExistanceCondition } from '../type/condition'
import { ExistenceQuery } from '../type/query'
import Base, { QueryType } from './base'

export default class Exists extends Base<ExistanceCondition, ExistenceQuery> {
  generate() {
    const { condition } = this
    return {
      [QueryType.EXISTENCE]: {
        field: condition.$exists,
      },
    }
  }
}
