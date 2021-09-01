import { FunctionScoreQuery, Random, Rescore } from '../function'
import SearchDSLGenerator from '../generator'
import { Filter, Should } from '../sentence/bool'
import { Mode } from '../type/query'

describe('Function score query', () => {
  const filter = new Filter({
    age: { $gte: 30 },
    name: { $in: ['John', 'Lulu'] },
    $not: { gender: 'MALE' },
  })
  const booster = new Should([{ $exists: 'location', location: 'Shanghai' }, { hometown: 'Tokyo' }])
  const dsl = new SearchDSLGenerator({ size: 10, from: 0 })
  const query = new FunctionScoreQuery({
    filter,
    booster,
    scoreMode: Mode.SUM,
    boostMode: Mode.SUM,
  })
  query.addFunction(new Random({ weight: 200 }))
  dsl.setQuery(query)
  it('Common function score query', () => {
    const expectedBody = {
      size: 10,
      from: 0,
      query: {
        function_score: {
          query: {
            bool: {
              filter: [
                { range: { age: { gte: 30 } } },
                {
                  bool: {
                    should: [{ term: { name: 'John' } }, { term: { name: 'Lulu' } }],
                  },
                },
                {
                  bool: {
                    must_not: { term: { gender: 'MALE' } },
                  },
                },
              ],
              should: [
                {
                  bool: {
                    must: [
                      {
                        exists: { field: 'location' },
                      },
                      { term: { location: 'Shanghai' } },
                    ],
                  },
                },
                {
                  term: {
                    hometown: 'Tokyo',
                  },
                },
              ],
            },
          },
          functions: [{ random_score: {}, weight: 200 }],
          score_mode: Mode.SUM,
          boost_mode: Mode.SUM,
        },
      },
    }
    expect(dsl.generate()).toEqual(expectedBody)
  })
  it('Function score query with rescore', () => {
    const expectedBody = {
      size: 10,
      from: 0,
      query: {
        function_score: {
          query: {
            bool: {
              filter: [
                { range: { age: { gte: 30 } } },
                {
                  bool: {
                    should: [{ term: { name: 'John' } }, { term: { name: 'Lulu' } }],
                  },
                },
                {
                  bool: {
                    must_not: { term: { gender: 'MALE' } },
                  },
                },
              ],
              should: [
                {
                  bool: {
                    must: [
                      {
                        exists: { field: 'location' },
                      },
                      { term: { location: 'Shanghai' } },
                    ],
                  },
                },
                {
                  term: {
                    hometown: 'Tokyo',
                  },
                },
              ],
            },
          },
          functions: [{ random_score: {}, weight: 200 }],
          score_mode: Mode.SUM,
          boost_mode: Mode.SUM,
        },
      },
      rescore: [
        {
          window_size: 50,
          query: {
            rescore_query: {
              function_score: {
                query: {
                  bool: {
                    filter: [
                      { range: { age: { gte: 30 } } },
                      {
                        bool: {
                          should: [{ term: { name: 'John' } }, { term: { name: 'Lulu' } }],
                        },
                      },
                      {
                        bool: {
                          must_not: { term: { gender: 'MALE' } },
                        },
                      },
                    ],
                    should: [
                      {
                        bool: {
                          must: [
                            {
                              exists: { field: 'location' },
                            },
                            { term: { location: 'Shanghai' } },
                          ],
                        },
                      },
                      {
                        term: {
                          hometown: 'Tokyo',
                        },
                      },
                    ],
                  },
                },
                functions: [{ random_score: {}, weight: 200 }],
                score_mode: Mode.SUM,
                boost_mode: Mode.SUM,
              },
            },
            rescore_query_weight: 0.5,
            score_mode: 'total',
          },
        },
      ],
    }
    dsl.addRescore(
      new Rescore({
        windowSize: 50,
        scoreMode: Mode.TOTAL,
        rescoreQueryWeight: 0.5,
        rescoreQuery: query,
      }),
    )
    expect(dsl.generate()).toEqual(expectedBody)
  })
  it('Function score query with rescores', () => {
    dsl.addRescores(
      new Rescore({
        windowSize: 50,
        scoreMode: Mode.TOTAL,
        rescoreQueryWeight: 0.5,
        rescoreQuery: query,
      }),
      new Rescore({
        windowSize: 39,
        scoreMode: Mode.TOTAL,
        rescoreQueryWeight: 0.5,
        rescoreQuery: query,
      }),
    )
    const dslBody = dsl.generate()
    const { rescore } = dslBody
    expect(rescore).toHaveLength(3)
  })
})
