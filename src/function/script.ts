import BaseFunction from './base'

export default class ScriptFunction extends BaseFunction {
  source!: string

  params?: { [key: string]: string | number | boolean }

  constructor(data: {
    source: string
    weight?: number
    params: { [key: string]: string | number | boolean }
  }) {
    const { source, weight, params } = data
    super(weight)
    this.source = source
    this.params = params
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
