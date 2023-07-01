const data = [10, 20, 30, 40, 50];

// const el = d3
//   .select('ul')
//   .selectAll('li')
//   .data(data)
//   .join('li')
//   .text((d) => d);
// console.log('el', el);

// const el = d3.select('ul').selectAll('li').data(data).join('li');
// console.log('el', el);

// const el = d3
//   .select('ul')
//   .selectAll('li')
//   .data(data)
//   .join('li')
//   .text((d) => d);
// console.log('el', el);

// const el = d3
//   .select('ul')
//   .selectAll('li')
//   .data(data)
//   .join(
//     (enter) => {
//       console.log('enter', enter);
//       return enter.append('li').style('color', 'green');
//     },
//     (update) => {
//       console.log('update', update);
//       return update.style('color', 'blue');
//     },
//     (exit) => {
//       console.log('exit', exit);
//       return exit.style('color', 'red');
//     }
//   )
//   .text((d) => d);
// console.log('el', el);

const el = d3
  .select('ul')
  .selectAll('li')
  .data(data)
  .text((d) => d);

el.enter('li')
  .append('li')
  .text((d) => d);

el.exit().remove();

console.log('el', el);
