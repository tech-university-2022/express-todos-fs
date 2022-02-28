const { deleteToDo } = require('../../src/services/deleteToDo.service');
const resultToDo = require('../../src/constants/resultToDo.json');

describe('patchToDo function', () => {
  xtest('should return an updated object with id and todo if a proper input is given', async () => {
    const expectedToDo = resultToDo;
    const toDo = await deleteToDo('1');
    expect(toDo).toStrictEqual(expectedToDo);
  });
  test('should throw invalid input error when number is given as input for id', async () => {
    try {
      await deleteToDo(5);
    } catch (err) {
      expect(err.message).toBe('Invalid input type for id.');
    }
  });
  test('should throw invalid input error when array is given as input for id', async () => {
    try {
      await deleteToDo([3, 4]);
    } catch (err) {
      expect(err.message).toBe('Invalid input type for id.');
    }
  });
  test('should throw invalid input error when boolean is given as input for id', async () => {
    try {
      await deleteToDo(true);
    } catch (err) {
      expect(err.message).toBe('Invalid input type for id.');
    }
  });
  test('should throw invalid input error when object is given as input for id', async () => {
    try {
      await deleteToDo({ a: 5 });
    } catch (err) {
      expect(err.message).toBe('Invalid input type for id.');
    }
  });
});
