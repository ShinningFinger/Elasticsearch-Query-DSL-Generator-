import ConstantScore from '../constant-score'

test('Simple constant score filter', () => {
  const constantScoreQuery = new ConstantScore({
    $constant: { filter: { age: { $gt: 27 } }, boost: 10 },
  }).generate()
  expect(constantScoreQuery).toEqual({
    constant_score: {
      filter: { range: { age: { gt: 27 } } },
      boost: 10,
    },
  })
})

test('Constant score with AND filter', () => {
  const constantScoreQuery = new ConstantScore({
    $constant: { filter: { age: { $gt: 27 }, name: 'John' }, boost: 10 },
  }).generate()
  expect(constantScoreQuery).toEqual({
    constant_score: {
      filter: [{ range: { age: { gt: 27 } } }, { term: { name: 'John' } }],
      boost: 10,
    },
  })
})

test('Constant score with IN filter', () => {
  const constantScoreQuery = new ConstantScore({
    $constant: { filter: { name: { $in: ['John', 'Lulu'] } }, boost: 10 },
  }).generate()
  expect(constantScoreQuery).toEqual({
    constant_score: {
      filter: { bool: { should: [{ term: { name: 'John' } }, { term: { name: 'Lulu' } }] } },
      boost: 10,
    },
  })
})

test('Constant score with IN and AND', () => {
  const constantScoreQuery = new ConstantScore({
    $constant: { filter: { name: { $in: ['John', 'Lulu'] }, age: { $gt: 27 } }, boost: 10 },
  }).generate()
  expect(constantScoreQuery).toEqual({
    constant_score: {
      filter: [
        { bool: { should: [{ term: { name: 'John' } }, { term: { name: 'Lulu' } }] } },
        { range: { age: { gt: 27 } } },
      ],
      boost: 10,
    },
  })
})

test('Constant score with EXISTS filter', () => {
  const constantScoreQuery = new ConstantScore({
    $constant: { filter: { $exists: 'location' }, boost: 10 },
  }).generate()
  expect(constantScoreQuery).toEqual({
    constant_score: {
      filter: { exists: { field: 'location' } },
      boost: 10,
    },
  })
})

test('Constant score with MATCHALL filter', () => {
  const constantScoreQuery = new ConstantScore({
    $constant: { filter: {}, boost: 10 },
  }).generate()
  expect(constantScoreQuery).toEqual({
    constant_score: {
      filter: { match_all: {} },
      boost: 10,
    },
  })
})
