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
  });
}
