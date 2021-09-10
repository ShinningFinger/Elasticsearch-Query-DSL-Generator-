import { FieldValueFactor } from '..'
import { Modifier } from '../field-value-factor'

test('field value factor function', () => {
  const fvf = new FieldValueFactor()
    .setField('age')
    .setFactor(3)
    .setModifier(Modifier.SQRT)
    .setMissing(26)
  expect(fvf.generate()).toEqual({
    field_value_factor: { field: 'age', factor: 3, modifier: 'sqrt', missing: 26 },
    weight: 1,
  })
})
