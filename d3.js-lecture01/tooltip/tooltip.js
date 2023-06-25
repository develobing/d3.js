const h = 100;
const w = 400;
const padding = 20;
const dataUrl =
  'https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json';
let dataset,
  ds,
  metrics = [];

window.onload = async () => {
  await setData();
  setCharts();
};

async function setData() {
  // // API Call
  // const repsonse = await fetch(dataUrl);
  // const data = await repsonse.json();
  // dataset = JSON.parse(window.atob(data['content']));
  // console.log('setData() - dataset', dataset);

  // D3.js Data Call
  return new Promise((resolve) => {
    d3.json(dataUrl, (error, data) => {
      if (error) {
        console.log('setData() - error', error);
      } else {
        dataset = JSON.parse(window.atob(data['content']));
        console.log('setData() - dataset', dataset);
        resolve();
      }
    });
  });
}

function setCharts() {
  dataset['contents'].forEach((d) => {
    ds = d;
    showHeader();
    draw();
    showTexts();
  });

  setEvent();
}

function showHeader() {
  d3.select('.container')
    .append('h2')
    .text(`${ds.category} Sales Data`)
    .attr('class', 'header');
}

function getDrawOptions() {
  const svgId = `svg-${ds.category}`;
  const pathClass = `path-${ds.category}`;

  const minDate = getDate(ds.monthlySales[0]['month']);
  const maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1]['month']);

  console.log('draw() - minDate', minDate);
  console.log('draw() - maxDate', maxDate);

  const xScale = d3.time
    .scale()
    .domain([minDate, maxDate])
    .range([padding + 5, w - padding]);
  const yScale = d3.scale
    .linear()
    .domain([0, d3.max(ds.monthlySales, (d) => d.sales)])
    .range([h - padding, 10])
    .nice();
  const getXPosition = (d) => xScale(getDate(d.month));
  const getYPosition = (d) => yScale(d.sales);

  const genXAxis = d3.svg
    .axis()
    .scale(xScale)
    .orient('bottom')
    .tickFormat(d3.time.format('%b'))
    .ticks(ds.monthlySales.length - 1);
  const genYAxis = d3.svg.axis().scale(yScale).orient('left').ticks(4);

  const lineFunc = d3.svg
    .line()
    .x(getXPosition)
    .y(getYPosition)
    .interpolate('linear');
  // .interpolate('basis');

  return {
    svgId,
    pathClass,
    genXAxis,
    genYAxis,
    lineFunc,
    getXPosition,
    getYPosition,
  };
}

function draw() {
  const {
    svgId,
    pathClass,
    genXAxis,
    genYAxis,
    lineFunc,
    getXPosition,
    getYPosition,
  } = getDrawOptions();

  const svg = d3.select('.container').append('svg').attr({
    id: svgId,
    width: w,
    height: h,
  });

  const xAxis = svg
    .append('g')
    .call(genXAxis)
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${h - padding})`);

  const yAxis = svg
    .append('g')
    .call(genYAxis)
    .attr('class', 'y-axis')
    .attr('transform', `translate(${padding}, 0)`);

  const viz = svg.append('path').attr({
    d: lineFunc(ds.monthlySales),
    stroke: 'purple',
    'stroke-width': 2,
    fill: 'none',
    class: pathClass,
  });

  const tooltip = getTooltip();

  const dots = svg
    .selectAll('circle')
    .data(ds.monthlySales)
    .enter()
    .append('circle')
    .attr({
      cx: getXPosition,
      cy: getYPosition,
      r: 4,
      fill: 'green',
      class: `circle-${ds.category}`,
    })
    .on('mouseover', function (d) {
      tooltip.transition().duration(500).style('opacity', 0.85);

      tooltip
        .html(`<strong>Sales $${d.sales}K</strong>`)
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY - 28}px`);
    })
    .on('mouseout', function (d) {
      tooltip.transition().duration(300).style('opacity', 0);
    });
}

function updateDraw() {
  const { svgId, pathClass, genXAxis, genYAxis, lineFunc } = getDrawOptions();

  const svg = d3.select('.container').select(`svg#${svgId}`);
  svg.selectAll('g.x-axis').call(genXAxis);
  svg.selectAll('g.y-axis').call(genYAxis);

  svg
    .selectAll(`.${pathClass}`)
    .transition()
    .duration(250)
    .ease('bounce')
    .attr({ d: lineFunc(ds.monthlySales) });
}

function showTexts() {
  const t = d3.select('.container').append('table');

  // Get Total
  let salesTotal = 0;
  for (let i = 0; i < ds.monthlySales.length; i++) {
    salesTotal += ds.monthlySales[i].sales * 1;
  }

  const salesAvg = salesTotal / ds.monthlySales.length;

  metrics.push('Sales Total: ' + salesTotal);
  metrics.push('Sales Avg: ' + salesAvg.toFixed(2));

  const tr = t
    .selectAll('tr')
    .append('tr')
    .data(metrics)
    .enter()
    .append('tr')
    .append('td')
    .text((d) => d);
}

function getDate(d) {
  const strDate = new String(d);
  const year = strDate.substr(0, 4);
  const month = strDate.substr(4, 2) - 1;
  const day = strDate.substr(6, 2);
  return new Date(year, month, day);
}

function setEvent() {
  d3.select('select').on('change', function (d, i) {
    const sel = d3.select('#date-option').node().value;

    dataset['contents'].forEach((d) => {
      ds = { ...d };
      console.log('ds.monthlySales', ds.monthlySales);
      ds.monthlySales = ds.monthlySales.slice(0, sel);

      updateDraw();
    });
  });
}

function getTooltip() {
  return d3
    .select('.container')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);
}
