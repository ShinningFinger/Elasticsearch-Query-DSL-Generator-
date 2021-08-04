/* eslint-disable import/no-cycle */
import { ConstantScoreCondition } from '../type/condition'
import { ConstantScoreQuery } from '../type/query'
import Base from './base'
import { Filter } from './bool'

export default class ConstantScore extends Base<ConstantScoreCondition, ConstantScoreQuery> {
  generate(): ConstantScoreQuery {
    const value = this.condition.$constant
    const { filter, boost } = value
    return {
      constant_score: {
        filter: new Filter(filter).generate().filter!,
        boost,
      },
    }
  }
}
