import { FunctionScore, Rescore } from './function'
import { DSL } from './type/query'

export default class SearchDSLGenerator {
  size: number

  private query?: FunctionScore

  private rescores?: Rescore[]

  constructor(size = 100) {
    this.size = size
  }

  setQuery(q: FunctionScore) {
    this.query = q
    return this
  }

  setRescores(rescores: Rescore[]) {
    this.rescores = rescores
    return this
  }

  generate(): DSL {
    const query = this.query ? this.query.generate() : { match_all: {} }
    const rescore = this.rescores ? this.rescores.map((r) => r.generate()) : undefined
    const output: DSL = { size: this.size, query }
    if (rescore) {
      output.rescore = rescore
    }
    return output
  }
}
