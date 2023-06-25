const w = 300;
const h = 400;
const padding = 2;
const dataset = [15, 10, 22, 30, 15, 22, 8, 19];
let svg = null;

window.onload = function () {
  setSvg();
  draw();
  addLabel();
};

function setSvg() {
  svg = d3
    .select('.container')
    .append('svg')
    .attr('width', w)
    .attr('height', h);
}

function draw() {
  svg
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr({
      x: (d, i) => i * (w / dataset.length),
      y: (d) => h - d * 4,
      width: w / dataset.length - padding,
      height: (d) => d * 4,
      fill: (d) => colorPicker(d),
    });
}

function addLabel() {
  svg
    .selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text((d) => d)
    .attr({
      'text-anchor': 'middle',
      x: (d, i) =>
        i * (w / dataset.length) + (w / dataset.length - padding) / 2,
      y: (d) => h - d * 4 + 15,
      'font-family': 'sans-serif',
      'font-size': 12,
      fill: '#ffffff',
    });
}

function colorPicker(v) {
  if (v <= 20) return '#666666';
  else if (v > 20) return '#FF0033';
}
