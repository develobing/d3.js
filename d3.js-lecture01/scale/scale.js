const h = 100;
const w = 400;
const dataUrl =
  'https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json';
let dataset,
  ds,
  metrics = [];

window.onload = async () => {
  await setData();
  setCharts();
};

async function setData() {
  // // API Call
  // const repsonse = await fetch(dataUrl);
  // const data = await repsonse.json();
  // dataset = JSON.parse(window.atob(data['content']));
  // console.log('setData() - dataset', dataset);

  // D3.js Data Call
  return new Promise((resolve) => {
    d3.json(dataUrl, (error, data) => {
      if (error) {
        console.log('setData() - error', error);
      } else {
        dataset = JSON.parse(window.atob(data['content']));
        console.log('setData() - dataset', dataset);
        resolve();
      }
    });
  });
}

function setCharts() {
  dataset['contents'].forEach((d) => {
    ds = d;
    showHeader();
    draw();
    showTexts();
  });
}

function showHeader() {
  d3.select('.container')
    .append('h2')
    .text(`${ds.category} Sales Data`)
    .attr('class', 'header');
}

function draw() {
  const xScale = d3.scale
    .linear()
    .domain([
      d3.min(ds.monthlySales, (d) => d.month),
      d3.max(ds.monthlySales, (d) => d.month),
    ])
    .range([0, w]);
  const yScale = d3.scale
    .linear()
    .domain([0, d3.max(ds.monthlySales, (d) => d.sales)])
    .range([h, 0]);

  const lineFunc = d3.svg
    .line()
    .x((d) => xScale(d.month))
    .y((d) => yScale(d.sales))
    .interpolate('linear');

  const svg = d3.select('.container').append('svg').attr({
    width: w,
    height: h,
  });

  const viz = svg.append('path').attr({
    d: lineFunc(ds.monthlySales),
    stroke: 'purple',
    'stroke-width': 2,
    fill: 'none',
  });
}

function showTexts() {
  const t = d3.select('.container').append('table');

  // Get Total
  let salesTotal = 0;
  for (let i = 0; i < ds.monthlySales.length; i++) {
    salesTotal += ds.monthlySales[i].sales * 1;
  }

  const salesAvg = salesTotal / ds.monthlySales.length;

  metrics.push('Sales Total: ' + salesTotal);
  metrics.push('Sales Avg: ' + salesAvg.toFixed(2));

  const tr = t
    .selectAll('tr')
    .append('tr')
    .data(metrics)
    .enter()
    .append('tr')
    .append('td')
    .text((d) => d);
}
