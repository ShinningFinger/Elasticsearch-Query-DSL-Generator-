/* eslint-disable import/no-cycle */
import { AndCondition } from '../../type/condition'
import { MustQuery } from '../../type/query'
import Base from '../base'
import { parse } from '../parse'

class Must extends Base<AndCondition, MustQuery> {
  generate(): MustQuery {
    const { condition } = this
    return {
      must: parse(condition),
    }
  }
}

export default Must
