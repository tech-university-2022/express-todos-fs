const { getToDo } = require('../../src/services/getToDo.services');

describe('getToDo function', () => {
  test('should return a object with id and todo if a proper input is given', async () => {
    const expectedToDo = [
      [
        { id: '1', todo: 'Take a break' },
        { id: '2', todo: 'Make tea' },
        { id: '3', todo: 'Buy 1kg rice' },
        { id: '4', todo: 'Follow tdd daily' },
        { id: '5', todo: 'Buy vegetables' },
      ],
    ];
    const toDo = await getToDo();
    console.log(toDo);
    expect(toDo).toStrictEqual(expectedToDo);
  });
});
