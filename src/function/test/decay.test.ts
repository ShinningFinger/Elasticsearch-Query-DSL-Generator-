import { Decay } from '..'
import Filter from '../../sentence/bool/filter'
import { DecayKind } from '../decay'

test('Gauss function without filter', () => {
  const gauss = new Decay({
    kind: DecayKind.GAUSS,
    key: 'age',
    offset: '187d',
    origin: '1998-01-01',
    scale: '365d',
    decay: 0.2,
    weight: 300,
  })
  expect(gauss.generate()).toEqual({
    gauss: {
      age: {
        offset: '187d',
        origin: '1998-01-01',
        scale: '365d',
        decay: 0.2,
      },
    },
    weight: 300,
  })
})

test('Gauss function with filter ', () => {
  const gauss = new Decay({
    kind: DecayKind.GAUSS,
    key: 'age',
    offset: '187d',
    origin: '1998-01-01',
    scale: '365d',
    decay: 0.2,
    weight: 300,
  })
  const filter = new Filter({ name: 'John', gender: 'MALE', age: { $lte: 28 } })
  gauss.setFilter(filter)
  expect(gauss.generate()).toEqual({
    filter: [
      { term: { name: 'John' } },
      { term: { gender: 'MALE' } },
      { range: { age: { lte: 28 } } },
    ],
    gauss: {
      age: {
        offset: '187d',
        origin: '1998-01-01',
        scale: '365d',
        decay: 0.2,
      },
    },
    weight: 300,
  })
})

test('Gauss function with default weight', () => {
  const gauss = new Decay({
    kind: DecayKind.GAUSS,
    key: 'age',
    offset: '187d',
    origin: '1998-01-01',
    scale: '365d',
    decay: 0.2,
  })
  expect(gauss.generate()).toEqual({
    gauss: {
      age: {
        offset: '187d',
        origin: '1998-01-01',
        scale: '365d',
        decay: 0.2,
      },
    },
    weight: 1,
  })
})
