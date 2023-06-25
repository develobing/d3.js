window.onload = () => {
  draw();
};

function draw() {
  const w = 200;
  const h = 100;
  const padding = 2;
  // const dataset = [5, 10, 15, 20, 25];
  const dataset = [5, 10, 14, 20, 25, 11, 25, 22, 18, 7];
  const svg = d3
    .select('.container')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  svg
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
      console.log('d', d);
      // console.log('i', i);
      // return i * 21;
      return i * (w / dataset.length);
    })
    .attr('y', function (d) {
      return h - d * 4;
    })
    .attr('width', w / dataset.length - padding)
    .attr('height', function (d) {
      return d * 4;
    })
    .style('fill', 'teal');
}
