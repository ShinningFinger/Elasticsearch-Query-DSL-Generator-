import { Weight } from '..'
import { Filter } from '../../sentence/bool'

test('Weight function', () => {
  const filter = new Filter({ name: 'John', gender: 'MALE', age: { $lte: 28 } })
  const weight = new Weight(1000)
  weight.setFilter(filter)
  expect(weight.generate()).toEqual({
    filter: [
      { term: { name: 'John' } },
      { term: { gender: 'MALE' } },
      { range: { age: { lte: 28 } } },
    ],
    weight: 1000,
  })
})
