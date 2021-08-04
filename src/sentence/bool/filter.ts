/* eslint-disable import/no-cycle */
import { AndCondition } from '../../type/condition'
import { FilterQuery } from '../../type/query'
import Base from '../base'
import { parse } from '../parse'

class Filter extends Base<AndCondition, FilterQuery> {
  generate(): FilterQuery {
    const { condition } = this
    return {
      filter: parse(condition),
    }
  }
}

export default Filter
