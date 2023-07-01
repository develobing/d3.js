async function getJsonData() {
  const data = await d3.json('data.json');
  console.log('getJsonData() - data', data);
}

async function getCsvData() {
  const data = await d3.csv('data.csv');
  const dataTable = await d3.csv('data-table.csv');
  console.log('getCsvData() - data', data);
  console.log('getCsvData() - dataTable', dataTable);
}

getJsonData();
getCsvData();
