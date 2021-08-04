import { Filter, Should } from '../bool'

test('should', () => {
  const shouldQuery = new Should([
    { age: { $gt: 25, $lt: 30, boost: 10 } },
    { name: 'John' },
  ]).generate()
  expect(shouldQuery).toEqual({
    should: [{ range: { age: { gt: 25, lt: 30, boost: 10 } } }, { term: { name: 'John' } }],
  })
})

test('filter', () => {
  const filter = new Filter({
    age: 28,
    $or: [
      { name: 'John', gender: 'MALE' },
      { name: 'Megan', gender: 'FEMALE' },
    ],
  }).generate()
  expect(filter).toEqual({
    filter: [
      { term: { age: 28 } },
      {
        bool: {
          should: [
            { bool: { must: [{ term: { name: 'John' } }, { term: { gender: 'MALE' } }] } },
            { bool: { must: [{ term: { name: 'Megan' } }, { term: { gender: 'FEMALE' } }] } },
          ],
        },
      },
    ],
  })
})

test('filter', () => {})
