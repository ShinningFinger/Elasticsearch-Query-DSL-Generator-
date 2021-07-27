export interface TermQuery {
  term: { [key: string]: unknown | { value: unknown; boost?: number } };
}

export interface RangeQuery {
  range: {
    [key: string]: { gte?: unknown; lte?: unknown; gt?: unknown; lt?: unknown };
  };
}

export interface ShouldQuery {
  should: QuerySentence[];
}

export interface BoolQuery {
  bool: {
    should?: QuerySentence[];
    must?: QuerySentence[];
    must_not?: QuerySentence[];
    filter?: QuerySentence[];
  };
}

export interface ExistenceQuery {
  exists: {
    field: string;
  };
}
export interface MustNotQuery {
  bool: {
    must_not?: ShouldQuery | TermQuery | RangeQuery | ExistenceQuery;
  };
}

export interface ConstantScoreQuery {
  constant_score: {
    filter: QuerySentence | QuerySentence[];
    boost?: number;
  };
}

export type QuerySentence =
  | TermQuery
  | RangeQuery
  | BoolQuery
  | MustNotQuery
  | ExistenceQuery
  | ConstantScoreQuery;
