import Table from '../Table';
import response from '../response';

describe('Table:', () => {
  describe('createTable method', () => {
    const table = new Table(response);
    table.createTable();

    test('should create an array with titles of table', () => {
      expect(table.titles).toMatchObject(['id', 'title', 'year', 'imdb']);
    });

    test('should add a new table from response data', () => {
      const tr = table.table.querySelectorAll('tr');
      const td = table.table.querySelectorAll('td');
      const th = table.table.querySelectorAll('th');

      expect(tr.length).toBe(6);
      expect(th.length).toBe(4);
      expect(td.length).toBe(20);
    });
  });

  describe('sort method', () => {
    const table = new Table(response);
    table.createTable();

    test('should sort fields with number', () => {
      table.sort('id', 1);
      const tr = table.table.querySelectorAll('tr');

      // первый элемент с id = 25
      expect(tr[0].childNodes[0].textContent).toBe('id');
      expect(tr[1].childNodes[1].textContent).toBe('25');

      // последний элемент с id = 1047
      expect(tr[5].childNodes[1].textContent).toBe('1047');
    });

    test('should sort fields with string', () => {
      table.sort('title', -1);
      const tr = table.table.querySelectorAll('tr');

      // первый элемент с title = 'Тёмный рыцарь'
      expect(tr[0].childNodes[1].textContent).toBe('title');
      expect(tr[1].childNodes[3].textContent).toBe('Тёмный рыцарь');

      // последний элемент с title = 'Криминальное чтиво'
      expect(tr[5].childNodes[3].textContent).toBe('Криминальное чтиво');
    });
  });
});
