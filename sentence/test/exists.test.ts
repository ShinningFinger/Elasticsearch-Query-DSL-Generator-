import Exists from "../exists";

test("Existence query", () => {
  const existsQuery = new Exists({
    condition: { $exists: "location" },
  }).generate();
  expect(existsQuery).toEqual({ exists: { field: "location" } });
});
