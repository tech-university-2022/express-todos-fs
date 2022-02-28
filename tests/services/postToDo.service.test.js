const { postToDo } = require('../../src/services/postToDo.service');
const resultToDo = require('../../src/constants/resultToDo.json');

describe('postToDo function', () => {
  xtest('should return an updated object with id and todo if a proper input is given', async () => {
    const expectedToDo = resultToDo;
    const toDo = await postToDo('get milk');
    expect(toDo).toStrictEqual(expectedToDo);
  });
  test('should throw invalid input error when number is given as input', async () => {
    try {
      await postToDo(5);
    } catch (err) {
      expect(err.message).toBe('Invalid input type for todo.');
    }
  });
  test('should throw invalid input error when array is given as input', async () => {
    try {
      await postToDo([3, 4]);
    } catch (err) {
      expect(err.message).toBe('Invalid input type for todo.');
    }
  });
  test('should throw invalid input error when boolean is given as input', async () => {
    try {
      await postToDo(true);
    } catch (err) {
      expect(err.message).toBe('Invalid input type for todo.');
    }
  });
  test('should throw invalid input error when object is given as input', async () => {
    try {
      await postToDo({ a: 5 });
    } catch (err) {
      expect(err.message).toBe('Invalid input type for todo.');
    }
  });
});
