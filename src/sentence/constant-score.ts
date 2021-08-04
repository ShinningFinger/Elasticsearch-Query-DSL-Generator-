import { ConstantScoreCondition } from '../type/condition'
import { ConstantScoreQuery } from '../type/query'
import Base, { QueryType } from './base'
import { Filter } from './bool'

export default class ConstantScore extends Base<ConstantScoreCondition, ConstantScoreQuery> {
  generate() {
    const value = this.condition.$constant
    const { filter, boost } = value
    return {
      [QueryType.CONSTANTSCORE]: {
        filter: new Filter(filter).generate().filter,
        boost,
      },
    }
  }
}
