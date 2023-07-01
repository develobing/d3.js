const h = 100;
const w = 400;
let dataset,
  ds,
  metrics = [];

window.onload = async () => {
  await setData();
  setCharts();
};

function setData() {
  return new Promise((resolve) => {
    d3.json('data-multiple.json', (error, data) => {
      if (error) {
        console.log('setData() - error', error);
      } else {
        console.log('setData() - data', data);
        dataset = data;
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
  const lineFunc = d3.svg
    .line()
    .x((d) => (d.month - 20130001) / 3.25)
    .y((d) => h - d.sales)
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
