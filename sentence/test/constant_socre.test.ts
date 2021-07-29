import ConstantScore from "../constant-score";

test("Constant score query", () => {
  const constantScoreQuery = new ConstantScore({
    key: "age",
    condition: { $constant: { $gt: 27 } },
    boost: 10,
  }).generate();
  expect(constantScoreQuery).toEqual({
    constant_score: {
      filter: { range: { age: { gt: 27 } } },
      boost: 10,
    },
  });
});

//TODO COMPLEX ConstantScore query
// test("Complex constant score query", () => {
//   const constantScoreQuery = new ConstantScore({
//     key: "age",
//     condition: { $constant: { $gt: 27 } },
//     boost: 10,
//   }).generate();
//   expect(constantScoreQuery).toEqual({
//     constant_score: {
//       filter: { range: { age: { gt: 27 } } },
//       boost: 10,
//     },
//   });
// });
