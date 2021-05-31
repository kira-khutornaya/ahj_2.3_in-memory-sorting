export default class Table {
  constructor(json) {
    this.response = JSON.parse(json);
    this.table = document.createElement('table');
  }

  createTable() {
    this.table.innerHTML = '';

    this.titles = Object.keys(this.response[0]);

    const firstRow = document.createElement('tr');
    firstRow.classList.add('row_first');
    this.table.appendChild(firstRow);

    this.titles.forEach((title) => {
      firstRow.innerHTML += `<th class="${title}">${title}</th>`;
      return firstRow;
    });

    this.response.forEach((el) => {
      this.table.innerHTML += `
        <tr class="row">
          <td>${el.id}</td>
          <td>${el.title}</td>
          <td>(${el.year})</td>
          <td>imdb: ${(+el.imdb).toFixed(2)}</td>
        </tr>
      `;
    });
  }

  showTable() {
    this.createTable(this.response);
    const container = document.querySelector('.container');
    container.appendChild(this.table);
  }

  sort(property, order = 1) {
    this.response.sort((a, b) => {
      if (a[property] > b[property]) return order;
      if (a[property] < b[property]) return -1 * order;
      return 0;
    });

    this.createTable(this.response);

    const currentColumn = this.table.querySelector(`th.${property}`);
    if (order === 1) currentColumn.classList.add('arrow_down');
    else currentColumn.classList.add('arrow_up');
  }
}
