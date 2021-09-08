import { ExistanceCondition, SingleExistanceCondition } from '../type/condition'
import { ExistenceQuery, SingleExistenceQuery } from '../type/query'
import Base from './base'

export default class Exists extends Base<ExistanceCondition, ExistenceQuery> {
  static generateSingle(condition: SingleExistanceCondition): SingleExistenceQuery {
    const { $exists } = condition
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
      exists: query,
    }
  }

  generate(): ExistenceQuery {
    const { $exists } = this.condition
    if (!Array.isArray($exists)) {
      return Exists.generateSingle({ $exists })
    }
    return { bool: { must: $exists.map((f) => Exists.generateSingle({ $exists: f })) } }
  }
}
