import Term from '../term'

const NormalTerm = {
  term: {
    name: 'John',
  },
}

const TermWithBoost = {
  term: {
    name: { value: 'John', boost: 100 },
  },
}

test('Basic term generate', () => {
  const output = new Term({ key: 'name', condition: 'John' }).generate()
  expect(output).toEqual(NormalTerm)
})

test('Boost term generate', () => {
  const output = new Term({ key: 'name', condition: 'John', boost: 100 }).generate()
  expect(output).toEqual(TermWithBoost)
})
