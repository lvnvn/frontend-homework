'use strict';

QUnit.module('Тестируем функцию set', function () {
	QUnit.test('set работает правильно c объектами с существующими свойствами', function (assert) {
		const object = {
			deep: {
				hested: {
					field: 'baz'
				}
			}
		};

		const object2 = {
			deep: {
				hested: {
					field: 42
				}
			}
		};

		const object3 = {
			deep: {
				hested: {
					foo: 'bar'
				}
			}
		};

		const object4 = {
			deep: null
		};

		assert.deepEqual(set({foo: 'bar'}, '.foo', 'baz'), {foo: 'baz'});
		assert.deepEqual(set(object, '.deep.hested.field', 42), object2);
        
		assert.deepEqual(set(object, '.deep.hested', {foo: 'bar'}), object3);
		assert.deepEqual(set(object, '.deep', null), object4);
	});

	QUnit.test('set изменяет переданный объект', function (assert) {
		const object = {
			foo: 'bar'
		};

		const object1 = {
			foo: 'baz'
		};

		const object2 = set(object, '.foo', 'baz');
		assert.deepEqual(object, object1);
		assert.deepEqual(object2, object1);
	});

	QUnit.test('set работает правильно c массивами', function (assert) {
		const object1 = {
			foo: [1, 2, 3],
			bar: [
				{foobar: '42'}
			]
		};

		const object2 = {
			foo: [1, 2, 3],
			bar: [
				{foobar: '42'}
			]
		};

		const new1 = {
			foo: [42, 2, 3],
			bar: [
				{foobar: '42'}
			]
		};

		const new2 = {
			foo: [1, 2, 3],
			bar: [
				{foobar: 'baz'}
			]
		};

		assert.deepEqual(set(object1, '.foo.0', 42), new1);
		assert.deepEqual(set(object2, '.bar.0.foobar', 'baz'), new2);
	});

	QUnit.test('set работает правильно c объектами без свойств', function (assert) {
		const object = {
			deep: {
				nested: {
					field: null
				}
			}
		};

		assert.deepEqual(set({}, '.deep.nested.field', null), object);
	});
	QUnit.test('set сохраняет структуру вложенных свойств', function (assert) {
		const object = {
			deep: {
				nested: {
					field: null
				}
			}
		};
		const object1 = {
			deep: {
				nested: {
					field: 1,
					field2: 2
				}
			}
		};

		assert.notDeepEqual(set(object, '.deep.nested.field', 1), object1);
		assert.deepEqual(set(object, '.deep.nested.field2', 2), object1);
	});
});
