import _ from 'lodash'
import { FunctionScoreQuery, Rescore } from './function'
import { DSL } from './type/query'

export default class SearchDSLGenerator {
  size: number

  from: number

  query?: FunctionScoreQuery

  rescores?: Rescore[]

  explain?: boolean

  constructor(params?: { size?: number; from?: number; explain?: boolean }) {
    if (params) {
      const { size = 10, from = 0, explain = false } = params
      this.size = size
      this.from = from
      if (explain) {
        this.explain = explain
      }
    }
  }

  public getResocres(): Rescore[] | undefined {
    return this.rescores
  }

  public setRescores(rescores: Rescore[]) {
    this.rescores = rescores
    return this
  }

  public addRescores(...r: Rescore[]) {
    if (!this.rescores) {
      this.rescores = []
    }
    this.rescores.push(...r)
    return this
  }

  public setQuery(q: FunctionScoreQuery) {
    this.query = q
    return this
  }

  public setSize(s: number) {
    this.size = s
    return this
  }

  public setFrom(f: number) {
    this.from = f
    return this
  }

  public setExplain(e: boolean) {
    this.explain = e
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
