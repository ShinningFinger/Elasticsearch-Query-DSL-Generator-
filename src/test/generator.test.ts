import { FunctionScoreQuery, Random, Rescore } from '../function'
import SearchDSLGenerator from '../generator'
import { Mode } from '../type/query'

describe('Function score query', () => {
  const dsl = new SearchDSLGenerator().setSize(10).setFrom(0)
  const query = new FunctionScoreQuery()
    .setFilter({
      age: { $gte: 30 },
      name: { $in: ['John', 'Lulu'] },
      $not: { gender: 'MALE' },
    })
    .setShould([{ $exists: 'location', location: 'Shanghai' }, { hometown: 'Tokyo' }])
    .setBoostScore(Mode.SUM)
    .setScoreMode(Mode.SUM)
  query.addFunctions(new Random().setWeight(200))
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
    dsl.addRescores(
      new Rescore()
        .setWindowSize(50)
        .setScoreMode(Mode.TOTAL)
        .setRescoreQueryWeight(0.5)
        .setRescoreQuery(query),
    )
    expect(dsl.generate()).toEqual(expectedBody)
  })
  it('Function score query with rescores', () => {
    dsl.addRescores(
      new Rescore()
        .setWindowSize(50)
        .setScoreMode(Mode.TOTAL)
        .setRescoreQueryWeight(0.5)
        .setRescoreQuery(query),
      new Rescore()
        .setWindowSize(50)
        .setScoreMode(Mode.TOTAL)
        .setRescoreQueryWeight(0.5)
        .setRescoreQuery(query),
    )
    const dslBody = dsl.generate()
    const { rescore } = dslBody
    expect(rescore).toHaveLength(3)
  })
})
