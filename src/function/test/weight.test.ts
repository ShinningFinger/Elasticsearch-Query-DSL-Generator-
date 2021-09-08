import { Weight } from '..'

test('Weight function', () => {
  const weight = new Weight({ weight: 1000 })
  weight.setFilter({ name: 'John', gender: 'MALE', age: { $lte: 28 } })
  expect(weight.generate()).toEqual({
    filter: [
      { term: { name: 'John' } },
      { term: { gender: 'MALE' } },
      { range: { age: { lte: 28 } } },
    ],
    weight: 1000,
  })
})
