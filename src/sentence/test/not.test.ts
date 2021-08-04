import Not from '../not'

test('Not query', () => {
  const notQuery = new Not({ $not: { name: { $in: ['John', 'William'] } } }).generate()
  expect(notQuery).toEqual({
    bool: {
      must_not: { bool: { should: [{ term: { name: 'John' } }, { term: { name: 'William' } }] } },
    },
  })
})
