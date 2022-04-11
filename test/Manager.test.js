const Manager = require("../LIB/Manager");

it("Can set office number via constructor argument", () => {
  const testValue = 100;
  const a = new Manager("Michael", 1, "test@test.com", testValue);
  expect(a.officeNumber).toBe(testValue);
});

it('getRole() should return "Manager"', () => {
  const testValue = "Manager";
  const a = new Manager("Michael", 1, "test@test.com", 100);
  expect(a.getRole()).toBe(testValue);
});

it("Can get office number via getOffice()", () => {
  const testValue = 100;
  const a = new Manager("Michael", 1, "test@test.com", testValue);
  expect(a.getOfficeNumber()).toBe(testValue);
});