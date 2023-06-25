const w = 500;
const h = 300;
const padding = 20;
const projection = d3.geo
  .albersUsa()
  .translate([w / 2, h / 2])
  .scale([500]);

window.onload = () => {
  draw();
};

function draw() {
  const path = d3.geo.path().projection(projection);
  const svg = d3.select('.container').append('svg').attr({
    width: w,
    height: h,
  });
  const color = d3.scale
    .linear()
    .range([
      '#ffffb2',
      '#fed976',
      '#feb24c',
      '#fd8d3c',
      '#fc4e2a',
      '#e31a1c',
      '#b10026',
    ]);

  d3.csv('state-sales.csv', function (csvData) {
    console.log('draw() - csvData', csvData);
    color.domain([0, d3.max(csvData, (d) => d.sales)]);

    d3.json('us.json', function (json) {
      console.log('setData() - json', json);

      for (let i = 0; i < csvData.length; i++) {
        const csvState = csvData[i].state;
        const csvSales = parseFloat(csvData[i].sales);

        for (let j = 0; j < json.features.length; j++) {
          const jsonState = json.features[j].properties.NAME;

          if (csvState == jsonState) {
            json.features[j].properties.value = csvSales;
            break;
          }
        }
      }

      svg
        .selectAll('path')
        .data(json.features)
        .enter()
        .append('path')
        .attr({
          d: path,
        })
        .style('fill', (d) => {
          const value = d.properties.value;
          if (value) {
            return color(value);
          } else {
            return '#ccc';
          }
        });
    });
  });
}
