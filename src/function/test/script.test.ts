import { Script } from '..'

test('Script function', () => {
  const script = new Script().setSource('-1').setWeight(200)
  expect(script.generate()).toEqual({
    script_score: { script: { source: '-1' } },
    weight: 200,
  })
})
