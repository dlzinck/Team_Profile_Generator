const Intern = require("../LIB/Intern");

it("Can set school via constructor", () => {
  const testValue = "UCLA";
  const a = new Intern("Foo", 1, "test@test.com", testValue);
  expect(a.school).toBe(testValue);
});

it("getRole() should return \"Intern\"", () => {
  const testValue = "Intern";
  const a = new Intern("Foo", 1, "test@test.com", "UCLA");
  expect(a.getRole()).toBe(testValue);
});

it("Can get school via getSchool()", () => {
  const testValue = "UCLA";
  const a = new Intern("Foo", 1, "test@test.com", testValue);
  expect(a.getSchool()).toBe(testValue);
});