const slices = [100, 200, 300, 400, 500];

const scale = d3
  .scaleLinear()
  .domain(d3.extent(slices))
  // .domain([d3.min(slices), d3.max(slices)])
  .range([10, 350]);

console.log('scale', scale);
console.log(scale(300));
