// const pBrowser = document.querySelector('p');
// console.log(pBrowser);

// const pD3 = d3.select('p');
// console.log(pD3);

const body = d3.select('body');
const el = body
  .append('p')
  // .attr('class', 'foo')
  // .attr('class', 'bar')
  .classed('foo', true)
  .classed('bar', true)
  .style('color', 'blue')
  .text('Hello World!');
console.log('body', body);
console.log('el', el);
