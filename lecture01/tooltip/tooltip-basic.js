const w = 300;
const h = 400;
const padding = 2;
const dataset = [15, 10, 22, 30, 15, 22, 8, 19];
let svg = null;

window.onload = function () {
  setSvg();
  draw();
  // addLabel();
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
    })

    .on('mouseover', function (d) {
      const x =
        parseFloat(d3.select(this).attr('x')) +
        parseFloat(d3.select(this).attr('width') / 2);
      const y = parseFloat(d3.select(this).attr('y')) + 12;

      svg.append('text').text(d).attr({
        'text-anchor': 'middle',
        x,
        y,
        'font-family': 'sans-serif',
        'font-size': 12,
        fill: '#ffffff',
        id: 'tooltip',
      });
    })
    .on('mouseout', function () {
      d3.select('#tooltip').remove();
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
