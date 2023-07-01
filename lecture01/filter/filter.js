const h = 400;
const w = 450;
let svg = null;

const dataset = [
  { month: 10, sales: 105 },
  { month: 20, sales: 130 },
  { month: 30, sales: 250 },
  { month: 40, sales: 300 },
  { month: 50, sales: 265 },
  { month: 60, sales: 122 },
  { month: 70, sales: 199 },
  { month: 80, sales: 222 },
  { month: 90, sales: 210 },
  { month: 100, sales: 265 },
];

window.onload = () => {
  setSvg();
  draw();
  addLabel();
  setEvent();
};

function setSvg() {
  svg = d3.select('.container').append('svg').attr({
    width: w,
    height: h,
  });
}

function draw() {
  const dots = svg.selectAll('circle').data(dataset).enter().append('circle');

  dots.attr({
    cx: (d) => d.month * 4,
    cy: (d) => h - d.sales,
    r: 5,
    fill: setKpi,
  });
}

function setKpi(d) {
  if (d.sales > 200) return '#33cc66';
  else if (d.sales > 100) return '#666666';
}

function showMinMax(ds, col, value, type) {
  const max = d3.max(ds, (d) => d[col]);
  const min = d3.min(ds, (d) => d[col]);

  if (type === 'minmax' && (value === max || value === min)) {
    return value;
  } else {
    if (type === 'all') {
      return value;
    }
  }
}

function addLabel() {
  const labels = svg.selectAll('text').data(dataset).enter().append('text');

  labels
    .text((d) => showMinMax(dataset, 'sales', d.sales, 'all'))
    .attr({
      x: (d) => d.month * 4 - 25,
      y: (d) => h - d.sales,
      'text-anchor': 'start',
      'font-size': '12px',
      'font-family': 'sans-serif',
    });
}

function setEvent() {
  d3.select('select').on('change', function (d) {
    const selectedValue = d3.select('#label-option').node().value;
    console.log('selectedValue', selectedValue);

    svg
      .selectAll('text')
      .data(dataset)
      .text((d) => showMinMax(dataset, 'sales', d.sales, selectedValue));
  });
}
