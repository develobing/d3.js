async function draw() {
  // Data
  const dataset = await d3.csv('data.csv');
  console.log('dataset', dataset);

  // Dimensions
  let dimensions = {
    width: 600,
    height: 600,
    margins: 10,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;
  const radius = dimensions.ctrWidth / 2;

  // Draw Image
  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const ctr = svg
    .append('g')
    .attr(
      'transform',
      `translate(${dimensions.margins}, ${dimensions.margins})`
    );

  // Scales
  const popuplationPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);
  const slices = popuplationPie(dataset);

  const arc = d3.arc().outerRadius(radius).innerRadius(0);
  const arcLabels = d3.arc().outerRadius(radius).innerRadius(200);

  const colors = d3.quantize(d3.interpolateSpectral, dataset.length);
  const colorScale = d3
    .scaleOrdinal()
    .domain(dataset.map((d) => d.name))
    .range(colors);

  // Draw Shape
  const arcGroup = ctr
    .append('g')
    .attr(
      'transform',
      `translate(${dimensions.ctrWidth / 2}, ${dimensions.ctrHeight / 2})`
    );

  arcGroup
    .selectAll('path')
    .data(slices)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', (d) => colorScale(d.data.name));

  const labelsGroup = ctr
    .append('g')
    .attr(
      'transform',
      `translate(${dimensions.ctrWidth / 2}, ${dimensions.ctrHeight / 2})`
    )
    .classed('labels', true);

  labelsGroup
    .selectAll('text')
    .data(slices)
    .enter()
    .append('text')
    .attr('transform', (d) => `translate(${arcLabels.centroid(d)})`)
    .call((text) =>
      text
        .append('tspan')
        .style('font-weight', 'bold')
        .attr('y', -4)
        .text((d) => d.data.name)
    )
    .call((text) =>
      text
        .filter((d) => d.endAngle - d.startAngle > 0.25)
        .append('tspan')
        .attr('y', 9)
        .attr('x', 0)
        .text((d) => d.data.value)
    );
  // .text((d) => d.data.name)
  // .attr('text-anchor', 'middle')
  // .attr('alignment-baseline', 'middle')
  // .style('font-size', 12)
  // .style('font-family', 'sans-serif');
}

draw();
