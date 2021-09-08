import Exists from '../exists'

test('Existence query', () => {
  const existsQuery = new Exists({ $exists: 'location' }).generate()
  expect(existsQuery).toEqual({ exists: { field: 'location' } })
})

test('Multi existence query', () => {
  const existsQuery = new Exists({ $exists: ['location', 'age', 'gender'] }).generate()
  expect(existsQuery).toEqual({
    bool: {
      must: [
        { exists: { field: 'location' } },
        { exists: { field: 'age' } },
        { exists: { field: 'gender' } },
      ],
    },
  })
})

test('Existence query with boost', () => {
  const existsQuery = new Exists({ $exists: { value: 'location', boost: 100 } }).generate()
  expect(existsQuery).toEqual({ exists: { field: 'location', boost: 100 } })
})
