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
};

function setSvg() {
  svg = d3.select('.container').append('svg').attr({
    width: w,
    height: h,
  });
}

function draw() {
  const lineFunc = d3.svg
    .line()
    .x((d) => d.month * 4)
    .y((d) => h - d.sales)
    // .interpolate('linear');
    .interpolate('basis');

  const viz = svg.append('path').attr({
    d: lineFunc(dataset),
    stroke: 'purple',
    'stroke-width': 2,
    fill: 'none',
  });
}

function addLabel() {
  const labels = svg.selectAll('text').data(dataset).enter().append('text');

  labels
    .text((d) => d.sales)
    .attr({
      x: (d) => d.month * 4 - 10,
      y: (d) => h - d.sales,
      'text-anchor': 'center',
      'font-size': '12px',
      'font-family': 'sans-serif',
      'font-weight': function (d, i) {
        if (i === 0 || i === dataset.length - 1) return 'bold';
        else return 'normal';
      },
      dy: '.35em',
      fill: '#666666',
    });
}
