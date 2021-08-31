import _ from 'lodash'
import { FunctionScoreQuery, Rescore } from './function'
import { DSL } from './type/query'

export default class SearchDSLGenerator {
  size: number

  from: number

  query?: FunctionScoreQuery

  private rescores?: Rescore[]

  explain?: boolean

  constructor(params: {
    size?: number
    from?: number
    explain?: boolean
    query?: FunctionScoreQuery
  }) {
    const { size = 10, from = 0, explain = false, query } = params
    this.query = query
    this.size = size
    this.from = from
    if (explain) {
      this.explain = explain
    }
  }

  public getResocres(): Rescore[] | undefined {
    return this.rescores
  }

  public setRescores(rescores: Rescore[]) {
    this.rescores = rescores
    return this
  }

  public addRescore(rescore: Rescore) {
    if (!this.rescores) {
      this.rescores = []
    }
    this.rescores?.push(rescore)
    return this
  }

  public setQuery(q: FunctionScoreQuery) {
    this.query = q
    return this
  }

  generate(): DSL {
    const query = this.query ? this.query.generate() : { match_all: {} }
    const rescore = this.rescores ? this.rescores.map((r) => r.generate()) : undefined
    const output: DSL = _.omitBy(
      { size: this.size, from: this.from, explain: this.explain, query },
      _.isUndefined,
    )
    if (rescore) {
      output.rescore = rescore
    }
    return output
  }
}
