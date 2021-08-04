import Range from '../range'
test('GT range', () => {
  const range = new Range({ age: { $gt: 1 } }).generate()
  expect(range).toEqual({ range: { age: { gt: 1 } } })
})

test('GT range with boost', () => {
  const range = new Range({ age: { $gt: 1, boost: 200 } }).generate()
  expect(range).toEqual({ range: { age: { gt: 1, boost: 200 } } })
})

test('GTE range', () => {
  const range = new Range({ age: { $gte: 1 } }).generate()
  expect(range).toEqual({ range: { age: { gte: 1 } } })
})

test('LT range', () => {
  const range = new Range({ age: { $lt: 1 } }).generate()
  expect(range).toEqual({ range: { age: { lt: 1 } } })
})

test('LTE range', () => {
  const range = new Range({ age: { $lte: 1 } }).generate()
  expect(range).toEqual({ range: { age: { lte: 1 } } })
})

test('Interval range', () => {
  const range = new Range({ age: { $gt: 1, $lt: 2 } }).generate()
  expect(range).toEqual({ range: { age: { gt: 1, lt: 2 } } })
  const anotherRange = new Range({ age: { $gte: 1, $lte: 2 } }).generate()
  expect(anotherRange).toEqual({ range: { age: { gte: 1, lte: 2 } } })
})
