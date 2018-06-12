const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const chartWidth = 650
const chartHeight = 400
const margin = ({ top: 150, right: 20, bottom: 50, left: 50 })

const circleRadius = 3;
const circleOpacity = 1;

let xScale = d3.scaleLinear()
  .domain([0, 300])
  .range([margin.left, chartWidth - margin.right])

let yScale = d3.scaleLinear()
  .domain([52, 1])
  .range([chartHeight - margin.bottom, margin.top])

let lineData = [{ x: 235, y: 1 }, { x: 235, y: 52 }];
let topLineData = [{ x: 0, y: 1 }, { x: 300, y: 1 }];

class positionChart extends D3Component {

  initialize(node, props) {

    const svg = this.svg = d3.select(node).append('svg');
    svg.attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`)
      .style('width', '100%')
      .style('height', 'auto')
      .style('overflow', 'visible');

    let xAxis = d3.axisBottom(xScale)
    let yAxis = d3.axisLeft(yScale)

    svg.append('g')
      .attr('id', 'x-axis')
      .attr('transform', 'translate(0,' + (chartHeight - margin.bottom) + ')')
      .call(xAxis);

    svg.append('g')
      .attr('transform', 'translate(' + margin.left + ', 0)')
      .call(yAxis);

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.left / 2)
      .attr("x", 0 - (chartHeight / 2))
      .style("text-anchor", "middle")
      .text("position");

    svg.append("text")
      .attr("transform", "translate(" + (chartWidth / 2) + " ," + (chartHeight - 10) + ")")
      .style("text-anchor", "middle")
      .text("number of riffles");

    svg.append("g")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.2)
      .selectAll("circle")
      .data(props.points)
      .enter().append("circle")
      .attr('class', 'point')
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", circleRadius)
      .attr("opacity", circleOpacity);

    var arc = d3.arc();

    var halfcircle = function (x, y, rad) {
      return svg.append('path')
        .attr('transform', 'translate(' + [x, y] + ')')
        .attr('d', arc({
          innerRadius: 0,
          outerRadius: rad,
          startAngle: -Math.PI * 0.5,
          endAngle: Math.PI * 0.5
        }));
    }

    // estimate annotation
    var radialGradient = svg.append("defs")
      .append("radialGradient")
      .attr("id", "radial-gradient");

    radialGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#f44336");

    radialGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#fff");

    // halfcircle(xScale(235), yScale(0), 50).attr('fill', "#eeeeee")
    // halfcircle(xScale(235), yScale(0), 30).attr('fill', "#cccccc")
    // halfcircle(xScale(235), yScale(0), 10).attr('fill', "#444444")

    let annotationLineGenerator = d3.line().x(function (d) { return xScale(d.x) }).y(function (d) { return yScale(d.y) });
    let topLineGenerator = d3.line().x(function (d) { return xScale(d.x) }).y(function (d) { return yScale(d.y) });

    svg.append("g")
      .append('path')
      .attr('d', annotationLineGenerator(lineData))
      .style("stroke-dasharray", ("4, 4"))
      .attr('stroke', '#f44336')
      .attr('stroke-width', 1)
      .attr('fill', 'none')
      .attr('id', 'expected-riffle-count')

    svg.append("text")
      .attr('id', 'expected-riffle-count-label')
      .attr("transform", "rotate(-90)")
      .attr("y", xScale(235 - 3))
      .attr("x", 0 - ((chartHeight) / 2))
      // .attr("dy", "1em")
      .style("text-anchor", "start")
      .text("expected riffle count")
      .style('fill', '#f44336');

    // annotation
    svg.append("g")
      .append('text')
      .text('K♦')
      .attr('x', xScale(0) + 5)
      .attr('y', yScale(52) - 5)
      .attr('id', 'chart-annotation')
      .attr('fill', '#f44336')
      .style('font-weight', 700)

    svg.append("g")
      .append('path')
      .attr('d', topLineGenerator(topLineData))
      .attr('stroke', '#cccccc')
      .attr('stroke-width', 1)
      .attr('fill', 'none')
      .attr('id', 'top-position')
  }
  

  update(props) {

    let newestPoint = props.points[props.points.length - 1]
    xScale.domain([0, d3.max([300, newestPoint.x])]);
    d3.select('#x-axis').call(d3.axisBottom(xScale))

    if (props.iterVal === 0) {
      this.svg.selectAll('circle').remove();
    }

    this.svg.selectAll('circle')
      .data(props.points)
      .enter().append("circle")
      .attr('class', 'point')
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", circleRadius)
      .attr("opacity", circleOpacity);

    this.svg.selectAll('circle')
      .data(props.points)
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", circleRadius)
      .attr("opacity", circleOpacity)
      // .attr("fill", function (d) {
      //   if (d.y === 1) {
      //     return '#f44336'
      //   }
      // })
      // .attr("r", function (d) {
      //   if (d.y === 1) {
      //     return 2*circleRadius;
      //   } else {
      //     return circleRadius;
      //   }
      // });

    this.svg.select('#chart-annotation')
      .attr('x', xScale(newestPoint.x) + 5)
      .attr('y', yScale(newestPoint.y) - 5)

    let clearLineGenerator = d3.line().x(function (d) { return xScale(d.iter) }).y(function (d) { return yScale(d.position) });

    this.svg.selectAll('.endPoint')
      .data(props.endPoints)
      .enter()
      .append("g")
      .append('path')
      .attr('class', 'endPoint')
      .attr('d', function (d) {
        console.log(d);
        console.log(xScale(d.iter));
        console.log(yScale(d.position));
        return clearLineGenerator(d)
      })
      .attr('stroke', 'gray')
      .attr('stroke-width', 1)
      .attr('fill', 'none')

    this.svg.selectAll('.endPointLabel')
      .data(props.endPoints)
      .enter()
      .append("text")
      .attr('class', 'endPointLabel')
      .attr("y", function (d) { return yScale(1) - 13 })
      .attr("x", function (d) { return xScale(d[0].iter) + 4 })
      .style("text-anchor", "middle")
      .attr('transform', function (d) { return 'rotate(270,' + (xScale(d[0].iter) + 4) + ',' + (yScale(1) - 13) + ')' })
      .text(function (d) { return d[0].iter })
      .style('fill', 'gray')
      .style('font-size', 12)

    this.svg.selectAll('.endPoint')
      .data(props.endPoints)
      .attr('d', function (d) { return clearLineGenerator(d) })

    this.svg.selectAll('.endPointLabel')
      .data(props.endPoints)
      .attr("y", function (d) { return yScale(1) - 13 })
      .attr("x", function (d) { return xScale(d[0].iter) + 4 })
      .attr('transform', function (d) { return 'rotate(270,' + (xScale(d[0].iter) + 4) + ',' + (yScale(1) - 13) + ')' })

    let annotationLineGenerator = d3.line().x(function (d) { return xScale(d.x) }).y(function (d) { return yScale(d.y) });

    this.svg.select('#expected-riffle-count-label')
      .attr("y", xScale(235 - 3))

    this.svg.select('#expected-riffle-count')
      .attr('d', annotationLineGenerator(lineData))

  }
}

module.exports = positionChart;
