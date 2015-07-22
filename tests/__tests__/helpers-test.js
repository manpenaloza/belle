/*global jest, describe, it, expect*/

jest.dontMock('../lib/utils/utility');

const helpers = require('../lib/utils/utility');

describe('helpers has method', () => {

  const obj = {test: true};

  it('should return true if object has the field', () => {
    expect(helpers.has(obj, 'test')).toBeTruthy();
  });

  it('should return false if object does not have the field', () => {
    expect(helpers.has(obj, 'rest')).toBeFalsy();
  });

  it('should not break if object is undefined or null', () => {
    expect(helpers.has(undefined, 'rest')).toBeFalsy();
    expect(helpers.has(null, 'rest')).toBeFalsy();
    expect(helpers.has({}, 'rest')).toBeFalsy();
  });

  it('should not break if field passed is undefined or null', () => {
    expect(helpers.has(obj, undefined)).toBeFalsy();
    expect(helpers.has(obj, null)).toBeFalsy();
  });
});

describe('helpers omit method', () => {

  const obj = {test1: 123, test2: 'abc', test3: (function(){}), test4: undefined};

  it('should return new object with keys omitted', () => {
    const keys = ['test1', 'test2'];
    const newObj = helpers.omit(obj, keys);
    expect(helpers.has(newObj, 'test1')).toBeFalsy();
    expect(helpers.has(newObj, 'test2')).toBeFalsy();
    expect(helpers.has(newObj, 'test3')).toBeTruthy();
    expect(helpers.has(newObj, 'test4')).toBeTruthy();
  });

  it('should not break if object is undefined or null', () => {
    let obj = undefined;
    let newObj;
    const keys = ['test1', 'test2'];
    newObj = helpers.omit(obj, keys);
    expect(newObj).toBeFalsy();
    obj = null;
    newObj = helpers.omit(obj, keys);
    expect(newObj).toBeFalsy();
  });

  it('should not break if keys is undefined or null or has length 0', () => {
    let newObj;
    let keys = undefined;
    newObj = helpers.omit(obj, keys);
    expect(helpers.has(newObj, 'test1')).toBeTruthy();
    expect(helpers.has(newObj, 'test2')).toBeTruthy();
    expect(helpers.has(newObj, 'test3')).toBeTruthy();
    expect(helpers.has(newObj, 'test4')).toBeTruthy();
    keys = null;
    newObj = helpers.omit(obj, keys);
    expect(helpers.has(newObj, 'test1')).toBeTruthy();
    expect(helpers.has(newObj, 'test2')).toBeTruthy();
    expect(helpers.has(newObj, 'test3')).toBeTruthy();
    expect(helpers.has(newObj, 'test4')).toBeTruthy();
    keys = [];
    newObj = helpers.omit(obj, keys);
    expect(helpers.has(newObj, 'test1')).toBeTruthy();
    expect(helpers.has(newObj, 'test2')).toBeTruthy();
    expect(helpers.has(newObj, 'test3')).toBeTruthy();
    expect(helpers.has(newObj, 'test4')).toBeTruthy();
  });

  it('should not change original object', () => {
    const keys = ['test1', 'test2'];
    helpers.omit(obj, keys);
    expect(helpers.has(obj, 'test1')).toBeTruthy();
    expect(helpers.has(obj, 'test2')).toBeTruthy();
    expect(helpers.has(obj, 'test3')).toBeTruthy();
    expect(helpers.has(obj, 'test4')).toBeTruthy();
  });
});


describe('helpers filter method', () => {

  const arr = [123, 'abc', (function(){}), undefined];
  const predicate = function(obj) {
    return obj !== 123;
  };

  it('should filter out objects from iterable as per predicate', () => {
    const filteredArr = helpers.filter(arr, predicate);
    expect(filteredArr.length).toBe(3);
    expect(filteredArr.indexOf(123)).toBeLessThan(0);
  });

  it('should not alter original array', () => {
    const filteredArr = helpers.filter(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr.indexOf(123)).toBe(0);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr = undefined;
    let filteredArr = helpers.filter(arr, predicate);
    expect(filteredArr).toBeFalsy();
    arr = null;
    filteredArr = helpers.filter(arr, predicate);
    expect(filteredArr).toBeFalsy();
    arr = [];
    filteredArr = helpers.filter(arr, predicate);
    expect(filteredArr.length).toBe(0);
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate = undefined;
    let filteredArr = helpers.filter(arr, predicate);
    expect(filteredArr.length).toBe(0);
    predicate = null;
    filteredArr = helpers.filter(arr, predicate);
    expect(filteredArr.length).toBe(0);
  });

});


describe('helpers map method', () => {

  const arr = [5, 10, 50, 100];
  const predicate = function(obj) {
    return obj/5;
  };

  it('should map to an output array as per predicate', () => {
    const mapArr = helpers.map(arr, predicate);
    expect(mapArr.length).toBe(4);
    expect(mapArr[0]).toBe(1);
  });

  it('should not alter original array', () => {
    helpers.map(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(5);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr = undefined;
    let mapArr = helpers.map(arr, predicate);
    expect(mapArr).toBeFalsy();
    arr = null;
    mapArr = helpers.map(arr, predicate);
    expect(mapArr).toBeFalsy();
    arr = [];
    mapArr = helpers.map(arr, predicate);
    expect(mapArr.length).toBe(0);
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate = undefined;
    let mapArr = helpers.map(arr, predicate);
    expect(mapArr.length).toBe(0);
    predicate = null;
    mapArr = helpers.filter(arr, predicate);
    expect(mapArr.length).toBe(0);
  });

});

describe('helpers find method', () => {

  const arr = [123, 'abc', (function(){}), undefined];
  const predicate = function(obj) {
    return typeof obj === 'number';
  };

  it('should find first numeric value in array', () => {
    const obj = helpers.find(arr, predicate);
    expect(obj).toBe(123);
  });

  it('should not alter original array', () => {
    helpers.find(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(123);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr = undefined;
    let obj = helpers.find(arr, predicate);
    expect(obj).toBeFalsy();
    arr = null;
    obj = helpers.find(arr, predicate);
    expect(obj).toBeFalsy();
    arr = [];
    obj = helpers.find(arr, predicate);
    expect(obj).toBeFalsy();
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate = undefined;
    let obj = helpers.find(arr, predicate);
    expect(obj).toBeFalsy();
    predicate = null;
    obj = helpers.find(arr, predicate);
    expect(obj).toBeFalsy();
  });

});

describe('helpers isEmpty method', () => {

  it('should return false for non-empty array', () => {
    expect(helpers.isEmpty([1,2,3])).toBeFalsy();
  });

  it('should return true for empty array', () => {
    expect(helpers.isEmpty([])).toBeTruthy();
    expect(helpers.isEmpty(null)).toBeTruthy();
    expect(helpers.isEmpty(undefined)).toBeTruthy();
  });
});

describe('helpers findIndex method', () => {

  const arr = [123, 'abc', (function(){}), undefined];
  const predicate = function(obj) {
    return typeof obj === 'number';
  };

  it('should find index of first numeric value in array', () => {
    const index = helpers.findIndex(arr, predicate);
    expect(index).toBe(0);
  });

  it('should not alter original array', () => {
    helpers.findIndex(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(123);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr = undefined;
    let obj = helpers.findIndex(arr, predicate);
    expect(obj).toBeFalsy();
    arr = null;
    obj = helpers.findIndex(arr, predicate);
    expect(obj).toBeFalsy();
    arr = [];
    obj = helpers.findIndex(arr, predicate);
    expect(obj).toBeFalsy();
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate = undefined;
    let obj = helpers.findIndex(arr, predicate);
    expect(obj).toBeFalsy();
    predicate = null;
    obj = helpers.findIndex(arr, predicate);
    expect(obj).toBeFalsy();
  });

});

describe('helpers last method', () => {

  it('should find last element of an array', () => {
    expect(helpers.last([1,2,3])).toBe(3);
    expect(helpers.last([1,2,3, null])).toBe(null);
    expect(helpers.last([1,2,3, undefined])).toBe(undefined);
  });

  it('should not break for empty array', () => {
    expect(helpers.last(undefined)).toBeFalsy();
    expect(helpers.last(null)).toBeFalsy();
    expect(helpers.last([])).toBeFalsy();
  });

});

describe('helpers size method', () => {

  it('should return size of an array', () => {
    expect(helpers.size([1,2,3])).toBe(3);
  });

  it('should not break for empty array', () => {
    expect(helpers.size(undefined)).toBe(0);
    expect(helpers.size(null)).toBe(0);
    expect(helpers.size([])).toBe(0);
  });

});

describe('helpers some method', () => {

  const arr = [123, 'abc', (function(){}), undefined];
  const predicate = function(obj) {
    return typeof obj === 'number';
  };

  it('should return true is predicate is true for some element', () => {
    const result = helpers.some(arr, predicate);
    expect(result).toBe(true);
  });

  it('should not alter original array', () => {
    helpers.some(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(123);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr = undefined;
    let obj = helpers.some(arr, predicate);
    expect(obj).toBeFalsy();
    arr = null;
    obj = helpers.some(arr, predicate);
    expect(obj).toBeFalsy();
    arr = [];
    obj = helpers.some(arr, predicate);
    expect(obj).toBeFalsy();
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate = undefined;
    let obj = helpers.some(arr, predicate);
    expect(obj).toBeFalsy();
    predicate = null;
    obj = helpers.some(arr, predicate);
    expect(obj).toBeFalsy();
  });

});

describe('helpers union method', () => {

  const arr1 = [123, 456, 789];
  const arr2 = ['abc', 'def', 'ghi'];
  const arr3 = [true, false];

  it('should return union of arrays', () => {
    const resultArr = helpers.union(arr1, arr2, arr3);
    expect(resultArr.length).toBe(8);
  });

  it('should not alter original arrays', () => {
    const resultArr = helpers.union(arr1, arr2);
    expect(arr1.length).toBe(3);
    expect(arr2.length).toBe(3);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    const resultArr = helpers.union(undefined, null, []);
    expect(helpers.size([])).toBe(0);
  });

});

describe('helpers extend method', () => {

  const obj1 = {};
  const obj2 = {a: 1, b: 2, c: 3};
  const obj3 = {a: 10, 1: 'abc', 2: undefined, 3: null};
  const obj4 = {has: true, is: false};

  it('should add (key, value) of objects passed to first object', () => {
    const resultObj = helpers.extend(obj1, obj2);
    expect(resultObj).toBe(obj1);
    expect(resultObj.a).toBe(1);
    expect(resultObj.b).toBe(2);
  });

  it('should override existing value', () => {
    const resultObj = helpers.extend(obj1, obj2, obj3);
    expect(resultObj.a).toBe(10);
  });

  it('should not alter objects other than the first one', () => {
    helpers.extend(obj1, obj2, obj3);
    expect(obj2.a).toBe(1);
  });

});