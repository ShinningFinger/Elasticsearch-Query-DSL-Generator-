export interface TermQuery {
  term: { [key: string]: unknown | { value: unknown; boost?: number } }
}

export interface RangeQuery {
  range: {
    [key: string]: { gte?: unknown; lte?: unknown; gt?: unknown; lt?: unknown }
  }
}

export interface ExistenceQuery {
  exists: {
    field: string
    boost?: number
  }
}

export type ShouldQuery = {
  should?: QuerySentence[]
}
export type MustQuery = {
  must?: QuerySentence | QuerySentence[]
}

export type FilterQuery = {
  filter?: QuerySentence | QuerySentence[]
}

export type MustNotQuery = {
  must_not?: QuerySentence | QuerySentence[]
}

export interface BoolQuery {
  bool: ShouldQuery | MustQuery | FilterQuery | MustNotQuery
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
  | MustQuery
  | MustNotQuery
  | FilterQuery
  | ShouldQuery
  | ExistenceQuery
  | ConstantScoreQuery
  | BoolQuery
