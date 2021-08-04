export interface TermQuery {
  term: { [key: string]: unknown | { value: unknown; boost?: number } }
}

export interface RangeQuery {
  range: {
    [key: string]: { gte?: unknown; lte?: unknown; gt?: unknown; lt?: unknown }
  }
}

export enum BoolKind {
  FILTER = 'filter',
  MUST = 'must',
  SHOULD = 'should',
  MUSTNOT = 'must_not',
}
export type BoolQuery = {
  [key in BoolKind]?: QuerySentence | QuerySentence[]
}

export interface BoolObject {
  bool: BoolQuery
}

export interface ExistenceQuery {
  exists: {
    field: string
    boost?: number
  }
}

export interface ConstantScoreQuery {
  constant_score: {
    filter: QuerySentence | QuerySentence[]
    boost?: number
  }
}

export type QuerySentence =
  | TermQuery
  | RangeQuery
  | BoolQuery
  | ExistenceQuery
  | ConstantScoreQuery
  | BoolObject
