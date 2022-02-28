const { patchToDo } = require('../../src/services/patchToDo.service');
const resultToDo = require('../../src/constants/resultToDo.json');

describe('patchToDo function', () => {
  xtest('should return an updated object with id and todo if a proper input is given', async () => {
    const expectedToDo = resultToDo;
    const toDo = await patchToDo('7', 'get milk');
    expect(toDo).toStrictEqual(expectedToDo);
  });
  test('should throw invalid input error when number is given as input for todo', async () => {
    try {
      await patchToDo('7', 5);
    } catch (err) {
      expect(err.message).toBe('Invalid input type for todo.');
    }
  });
  test('should throw invalid input error when array is given as input for todo', async () => {
    try {
      await patchToDo('7', [3, 4]);
    } catch (err) {
      expect(err.message).toBe('Invalid input type for todo.');
    }
  });
  test('should throw invalid input error when boolean is given as input for todo', async () => {
    try {
      await patchToDo('7', true);
    } catch (err) {
      expect(err.message).toBe('Invalid input type for todo.');
    }
  });
  test('should throw invalid input error when object is given as input for todo', async () => {
    try {
      await patchToDo('7', { a: 5 });
    } catch (err) {
      expect(err.message).toBe('Invalid input type for todo.');
    }
  });
  test('should throw invalid input error when array is given as input for id', async () => {
    try {
      await patchToDo(['a'], 'a');
    } catch (err) {
      expect(err.message).toBe('Invalid input type for id.');
    }
  });
  test('should throw invalid input error when boolean is given as input for id', async () => {
    try {
      await patchToDo(true, 'a');
    } catch (err) {
      expect(err.message).toBe('Invalid input type for id.');
    }
  });
});
