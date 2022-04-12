const Engineer = require("../LIB/Engineer");

it("Can set GitHUb account via constructor", () => {
  const testValue = "GitHubUser";
  const a = new Engineer("Foo", 1, "test@test.com", testValue);
  expect(a.github).toBe(testValue);
});

it("getRole() should return \"Engineer\"", () => {
  const testValue = "Engineer";
  const a = new Engineer("Foo", 1, "test@test.com", "GitHubUser");
  expect(a.getRole()).toBe(testValue);
});

it("Can get GitHub username via getGithub()", () => {
  const testValue = "GitHubUser";
  const a = new Engineer("Foo", 1, "test@test.com", testValue);
  expect(a.getGitHub()).toBe(testValue);
});