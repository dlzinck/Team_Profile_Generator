const Employee = require('../LIB/Employee');

it('Can instantiate Employee instance', () => {
	const a = new Employee();
	expect(typeof a).toBe('object');
});
it('Can set name via constructor arguments', () => {
	const name = 'Dwight';
	const a = new Employee(name);
	expect(a.name).toBe(name);
});
it('Can set id via constructor argument', () => {
	const testValue = 100;
	const a = new Employee('Foo', testValue);
	expect(a.id).toBe(testValue);
});
test('Can set email via constructor argument', () => {
	const testValue = 'test@test.com';
	const a = new Employee('Foo', 1, testValue);
	expect(a.email).toBe(testValue);
});
test('Can get name via getName()', () => {
	const testValue = 'Dwight';
	const a = new Employee(testValue);
	expect(a.getName()).toBe(testValue);
});
test('Can get id via getId()', () => {
	const testValue = 100;
	const a = new Employee('Foo', testValue);
	expect(a.getId()).toBe(testValue);
});
test('Can get email via getEmail()', () => {
	const testValue = 'test@test.com';
	const a = new Employee('Foo', 1, testValue);
	expect(a.getEmail()).toBe(testValue);
});
test('getRole() should return "Employee"', () => {
	const testValue = 'Employee';
	const a = new Employee('Dwight', 1, 'test@test.com');
	expect(a.getRole()).toBe(testValue);
});