import ConstantScore from '../constant-score'

test('Constant score query', () => {
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

test('Complex constant score query', () => {
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
