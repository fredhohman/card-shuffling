const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const chartWidth = 600
const chartHeight = 300
const margin = ({ top: 50, right: 50, bottom: 50, left: 50 })

let xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([margin.left, chartWidth - margin.right])

let yScale = d3.scaleLinear()
    .domain([0, 53])
    .range([chartHeight - margin.bottom, margin.top])

let chartData = [{ count: 0, place: 52 }, { count: 10, place: 20 }]

class positionChart extends D3Component {

  initialize(node, props) {
    const svg = this.svg = d3.select(node).append('svg');
    svg.attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`)
      .style('width', '100%')
      .style('height', 'auto');

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
          // .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("position");

      svg.append("text")
          .attr("transform", "translate(" + (chartWidth / 2) + " ," + (chartHeight - 10) + ")")
          .style("text-anchor", "middle")
          .text("counter");

      svg.append("g")
          .attr("stroke", "#000")
          .attr("stroke-opacity", 0.2)
          .selectAll("circle")
          .data(props.points)
          .enter().append("circle")
          .attr('class', 'point')
          .attr("cx", d => xScale(d.x))
          .attr("cy", d => yScale(d.y))
          .attr("r", 2.5);

        svg.append("g")
          .append('text')
          .text('K♦')
          .attr('x', xScale(0) + 5)
          .attr('y', yScale(52) - 5)
          .attr('id', 'chart-annotation')
          .attr('fill', 'red')
          .style('font-weight', 700)

  }

  update(props) {
    console.log(props.points);
    console.log(props.points[props.points.length - 1].x)
    
    let newestPoint = props.points[props.points.length - 1]
    xScale.domain([0, newestPoint.x]);
    xScale.domain([0, 235]);
    d3.select('#x-axis').call(d3.axisBottom(xScale))

    this.svg.selectAll('circle')
      .data(props.points)
      .enter().append("circle")
      .attr('class', 'point')
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 2.5);

    this.svg.selectAll('circle')
      .data(props.points)
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 2.5);

    this.svg.select('#chart-annotation')
      .attr('x', xScale(newestPoint.x) + 5)
      .attr('y', yScale(newestPoint.y) - 5)


  }
}

module.exports = positionChart;
