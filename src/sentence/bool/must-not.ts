/* eslint-disable import/no-cycle */
import { AndCondition } from '../../type/condition'
import { MustNotQuery } from '../../type/query'
import Base from '../base'
import { parse } from '../parse'

class MustNot extends Base<AndCondition, MustNotQuery> {
  generate(): MustNotQuery {
    const { condition } = this
    return {
      must_not: parse(condition),
    }
  }
}

export default MustNot
