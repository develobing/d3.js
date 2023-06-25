const h = 100;
const w = 400;
let ds,
  metrics = [];

window.onload = async () => {
  await setData();
  draw();
  showTexts();
};

function setData() {
  return new Promise((resolve) => {
    d3.csv('data.csv', (error, data) => {
      if (error) {
        console.log('setData() - error', error);
      } else {
        console.log('setData() - data', data);
        ds = data;
        resolve();
      }
    });
  });
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
    d: lineFunc(ds),
    stroke: 'purple',
    'stroke-width': 2,
    fill: 'none',
  });
}

function showTexts() {
  const t = d3.select('.container').append('table');

  // Get Total
  let salesTotal = 0;
  for (let i = 0; i < ds.length; i++) {
    salesTotal += ds[i].sales * 1;
  }

  const salesAvg = salesTotal / ds.length;

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
