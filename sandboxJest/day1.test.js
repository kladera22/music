const { expectCt } = require('helmet')
const {
    twoNumbers,
    stringTest,
    arrayTest,
    objectTest
} = require('./day1')

let name = 't'

beforeAll(() => {
    name = 'ti'
})

afterAll(() => {
    name = 'done!'
})

test('should expect value does not equal to ti', () => {
    name = 'tin'
    expect(name).not.toEqual('ti')
})

describe('test twoNumbers function', () => {

    test('should expect that num1 and num2 have equal value', () => {
        expect(twoNumbers(5, 5)).toBe('two numbers are equal')
        expect(twoNumbers(5, 5)).toBeTruthy()
    })

    test('should return the difference of num1 and num2 if num1 > num2', () => {
        expect(twoNumbers(15, 10)).toBe(5)
        expect(twoNumbers(15, 10)).not.toBeNull()
    })

    test('should return the equal of num1 and num2 if num1 < num2', () => {
        expect(twoNumbers(10, 15)).toBe(25)
        expect(twoNumbers(10, 15)).toBeGreaterThan(0)
    })

    test('should return missing number if argument are empty', () => {
        expect(twoNumbers(5)).toBe('missing numbers')
    })
})

describe('test stringTest function', () => {

    test('should return false if no strings attatch', () => {
        expect(stringTest()).toBeFalsy()
        expect(stringTest('zebra')).toBeTruthy()
    })

    test('should return index of letter t', () => {
        expect(stringTest('tara')).toBe(0)
        expect(stringTest('karate')).toBeGreaterThan(0)
    })

    test('should return Letter t was not found if no letter t was found', () => {
        expect(stringTest('kara')).toBe(`Letter 't' was not found`)
    })
})

describe('test arrayTest function', () => {

    test('should return false if array is empty', () => {
        expect(arrayTest([]).length).toBeFalsy()
    })

    test('should return true if array contains number 5', () => {
        expect(arrayTest([1, 2, 3, 4, 5])).toBeTruthy()
    })

    test('should expect value equal to a new arrey that is the double value of each element', () => {
        expect(arrayTest([1, 2, 3, 4])).toEqual([2, 4, 6, 8])
    })
  
})

describe('test objectTest function', () => {

    test('should return false if the object isd undefined or empty', () => {
        expect(objectTest({})).toBeFalsy()
    })

    test('should return true if the object does contains a key-value pair called name: tony', () => {
        expect(objectTest({name: 'tony'})).toBeTruthy()
    })

    test('should throw error if object does not contain key-value paired name: tony', () => {
        expect(() => objectTest({name: 'thony'})).toThrow(Error)
    })
})