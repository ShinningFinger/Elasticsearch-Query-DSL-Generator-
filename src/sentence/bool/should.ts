/* eslint-disable import/no-cycle */
import { Bool, Must } from '.'
import { Condition, isSingleCondition } from '../../type/condition'
import { ShouldQuery } from '../../type/query'
import Base from '../base'
import { singleConditionParse } from '../parse'

class Should extends Base<Condition[], ShouldQuery> {
  generate(): ShouldQuery {
    const subconditions = this.condition
    const sentences = subconditions.map((c) => {
      if (isSingleCondition(c)) {
        return singleConditionParse(c)
      }
      return new Bool({ must: new Must(c) }).generate()
    })
    return {
      should: sentences,
    }
  }
}

export default Should
