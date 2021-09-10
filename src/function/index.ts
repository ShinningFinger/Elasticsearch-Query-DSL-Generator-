// eslint-disable-next-line max-classes-per-file
import * as _ from 'lodash'
import { Bool, Filter, Must, Should } from '../sentence/bool'
import { Condition } from '../type/condition'
import { Mode, RescoreQuery } from '../type/query'
import Decay from './decay'
import FieldValueFactor from './field-value-factor'
import Random from './random'
import Script from './script'
import Weight from './weight'

class FunctionScoreQuery {
  scoreMode?: Mode

  boostMode?: Mode

  private functions!: (Decay | FieldValueFactor | Random | Script | Weight)[]

  private filter?: Filter

  private should?: Should

  private must?: Must

  constructor(param?: { scoreMode?: Mode; boostMode?: Mode }) {
    if (param) {
      const { scoreMode = Mode.SUM, boostMode = Mode.SUM } = param
      this.boostMode = boostMode
      this.scoreMode = scoreMode
    }
  }

  setFilter(f: Condition) {
    this.filter = new Filter(f)
    return this
  }

  setMust(m: Condition) {
    this.must = new Must(m)
    return this
  }

  setShould(b: Condition[]) {
    this.should = new Should(b)
    return this
  }

  setFunctions(functions: (Decay | FieldValueFactor | Random | Script | Weight)[]) {
    this.functions = functions
    return this
  }

  addFunctions(...f: (Decay | FieldValueFactor | Random | Script | Weight)[]) {
    if (!this.functions) {
      this.functions = []
    }
    this.functions.push(...f)
  }

  public setBoostScore(b: Mode) {
    this.boostMode = b
    return this
  }

  public setScoreMode(s: Mode) {
    this.scoreMode = s
    return this
  }

  generate() {
    const { scoreMode, boostMode } = this
    const boolObject = new Bool()
    if (this.filter) {
      boolObject.setFilter(this.filter)
    }
    if (this.should) {
      boolObject.setShould(this.should)
    }
    const functions = this.functions ? this.functions.map((f) => f.generate()) : undefined
    return {
      function_score: _.omitBy(
        {
          query: boolObject.generate(),
          functions,
          score_mode: scoreMode,
          boost_mode: boostMode,
        },
        _.isEmpty,
      ),
    }
  }
}

class Rescore {
  windowSize: number

  scoreMode: Mode

  rescoreQueryWeight: number

  rescoreQuery: FunctionScoreQuery

  public setWindowSize(w: number) {
    this.windowSize = w
    return this
  }

  public setScoreMode(s: Mode) {
    this.scoreMode = s
    return this
  }

  public setRescoreQueryWeight(w: number) {
    this.rescoreQueryWeight = w
    return this
  }

  public setRescoreQuery(q: FunctionScoreQuery) {
    this.rescoreQuery = q
    return this
  }

  generate(): RescoreQuery {
    const { windowSize, rescoreQuery, scoreMode, rescoreQueryWeight } = this
    const output: any = {
      window_size: windowSize,
    }
    if (!rescoreQuery) {
      output.query = { rescore_query: { match_all: {} } }
    } else {
      output.query = {
        rescore_query: rescoreQuery.generate(),
        rescore_query_weight: rescoreQueryWeight,
        score_mode: scoreMode,
      }
    }
    return output
  }
}

export { Decay, Random, Weight, FieldValueFactor, Script, FunctionScoreQuery, Rescore }
