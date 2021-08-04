import Or from '../or'

test('Or query', () => {
  const orQuery = new Or({ $or: [{ name: 'John' }, { age: 5 }] }).generate()
  expect(orQuery).toEqual({
    bool: { should: [{ term: { name: 'John' } }, { term: { age: 5 } }] },
  })
})
