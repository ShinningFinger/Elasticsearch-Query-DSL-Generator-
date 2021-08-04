import In from '../in'

test('In query', () => {
  const inQuery = new In({ name: { $in: ['John', 'William'] } }).generate()
  expect(inQuery).toEqual({
    bool: { should: [{ term: { name: 'John' } }, { term: { name: 'William' } }] },
  })
})
