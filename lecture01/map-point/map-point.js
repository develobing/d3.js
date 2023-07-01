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

  d3.json('us.json', function (json) {
    console.log('draw() - json', json);

    svg.selectAll('path').data(json.features).enter().append('path').attr({
      d: path,
      fill: '#666666',
    });

    d3.csv('sales-by-city.csv', function (csvData) {
      console.log('draw() - csvData', csvData);

      svg
        .selectAll('circle')
        .data(csvData)
        .enter()
        .append('circle')
        .attr({
          cx: (d) => {
            if (isNaN(d.lon) || isNaN(d.lat)) return 0;
            return projection([d.lon, d.lat])[0];
          },
          cy: (d) => {
            if (isNaN(d.lon) || isNaN(d.lat)) return 0;
            return projection([d.lon, d.lat])[1];
          },
          r: (d) => Math.sqrt(parseInt(d.sales) * 0.00005),
          fill: 'red',
        });
    });
  });
}
