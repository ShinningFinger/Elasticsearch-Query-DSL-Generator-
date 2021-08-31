import { Filter } from '../bool'

test('Match all query', () => {
  const inQuery = new Filter({}).generate()
  expect(inQuery).toEqual({
    filter: { match_all: {} },
  })
})
