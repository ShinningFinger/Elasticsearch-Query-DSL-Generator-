// eslint-disable-next-line max-classes-per-file
import * as _ from 'lodash'
import { Bool, Filter, Should } from '../sentence/bool'
import { Mode, RescoreQuery } from '../type/query'
import Decay from './decay'
import FieldValueFactor from './field-value-factor'
import Random from './random'
import Script from './script'
import Weight from './weight'

class FunctionScore {
  scoreMode?: Mode

  boostMode?: Mode

  private functions!: (Decay | FieldValueFactor | Random | Script | Weight)[]

  private filter?: Filter

  private booster?: Should

  constructor(param: { scoreMode?: Mode; boostMode?: Mode }) {
    const { scoreMode, boostMode } = param
    this.boostMode = boostMode
    this.scoreMode = scoreMode
  }

  setFilter(f: Filter) {
    this.filter = f
    return this
  }

  setBooster(b: Should) {
    this.booster = b
    return this
  }

  setFunctions(functions: (Decay | FieldValueFactor | Random | Script | Weight)[]) {
    this.functions = functions
    return this
  }

  generate() {
    const { scoreMode, boostMode } = this
    const boolObject = new Bool()
    if (this.filter) {
      boolObject.setFilter(this.filter)
    }
    if (this.booster) {
      boolObject.setBooster(this.booster)
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

  rescoreQuery: FunctionScore

  constructor(params: {
    windowSize: number
    scoreMode: Mode
    rescoreQueryWeight: number
    rescoreQuery: FunctionScore
  }) {
    this.windowSize = params.windowSize
    this.scoreMode = params.scoreMode
    this.rescoreQueryWeight = params.rescoreQueryWeight
    this.rescoreQuery = params.rescoreQuery
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

export { Decay, Random, Weight, FieldValueFactor, Script, FunctionScore, Rescore }
