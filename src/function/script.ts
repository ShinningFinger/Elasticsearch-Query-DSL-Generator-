import BaseFunction from './base'

export default class ScriptFunction extends BaseFunction {
  source!: string

  params?: { [key: string]: string | number | boolean }

  public setSource(s: string) {
    this.source = s
    return this
  }

  public setParams(params: { [key: string]: string | number | boolean }) {
    this.params = params
    return this
  }

  generate() {
    return {
      script_score: {
        script: { source: this.source },
      },
      weight: this.weight,
    }
  }
}
