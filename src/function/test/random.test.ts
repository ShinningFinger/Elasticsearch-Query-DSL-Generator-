import { Random } from '..'

test('Simple random function', () => {
  const random = new Random().setWeight(200)
  expect(random.generate()).toEqual({
    random_score: {},
    weight: 200,
  })
})

test('Random function', () => {
  const random = new Random().setField('timestamp').setSeed('35687921').setWeight(200)
  expect(random.generate()).toEqual({
    random_score: { field: 'timestamp', seed: '35687921' },
    weight: 200,
  })
})
