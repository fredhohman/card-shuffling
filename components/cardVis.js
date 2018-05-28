const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 650;
const height = 300;
const cardWidthMultiplier = 2.5;
const cardHeightMultiplier = 3.5;
const cardSize = 15;

const cardPrimitives = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const suites = ["♠","♣","♥","♦"];

function makeCards(suites, cardPrimitives) {
  let cards = [];
  for (let i = 0; i < suites.length; i++) {
      for (let j = 0; j < cardPrimitives.length; j++) {
        cards.push(cardPrimitives[j] + suites[i]);
     }
  }
  return cards;
}

let cards = makeCards(suites, cardPrimitives);

console.log(cards);

class cardVis extends D3Component {

  initialize(node, props) {

    const svg = this.svg = d3.select(node).append('svg');

    svg.attr('viewBox', `0 0 ${size} ${height}`)
      .style('width', '100%')
      .style('height', 'auto');

    svg.selectAll('rect')
      .data(cards)
      .enter()
      .append('rect')
      .attr('class', 'card')
      .attr('x', function(d, i) { return 40 + i%13 * 45 - 10; })
      .attr('y', function(d, i) {
        if(i < (cards.length-1)*(1/4)){
          return height*(1/5) - 16;
        }
        if(i > (cards.length-1)*(1/4) && i < (cards.length-1)*(2/4)){
          return height*(2/5) - 16;
        }
        if(i > (cards.length-1)*(2/4) && i < (cards.length-1)*(3/4)){
          return height*(3/5) - 16;
        }
        if(i > (cards.length-1)*(3/4) && i <= (cards.length-1)*(4/4)){
          return height*(4/5) - 16;
        }
      })
      .attr('width', cardSize*cardWidthMultiplier)
      .attr('height', cardSize*cardHeightMultiplier)
      .attr('fill', function(d) {
          if(d === 'K♦') {
          return 'red';
        } else {
          return '#FFFFFF';
        }
      })
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('stroke', '#444444')
      .attr('stroke-wdith', 1)
      // .on('mouseover', function(d) { d3.select(this).attr('fill', '#F0F0F0'); })
      // .on('mouseout', function(d) { d3.select(this).attr('fill', '#FFFFFF'); });

    svg.selectAll('text')
      .data(cards)
      .enter()
      .append('text')
      .attr('class', 'card-text')
      .attr('x', function(d, i) { return 35 + i%13 * 45; })
      .attr('y', function(d, i) {
        if(i < (cards.length-1)*(1/4)){
          return height*(1/5);
        }
        if(i > (cards.length-1)*(1/4) && i < (cards.length-1)*(2/4)){
          return height*(2/5);
        }
        if(i > (cards.length-1)*(2/4) && i < (cards.length-1)*(3/4)){
          return height*(3/5);
        }
        if(i > (cards.length-1)*(3/4) && i <= (cards.length-1)*(4/4)){
          return height*(4/5);
        }
      })
      // .attr('x', function(d,i) { return 20 + i*20 })
      .text(function(d) { return d; })
      .attr('text-anchor', 'start')
      .attr('fill', function(d) {
        if(d === 'K♦') {
          return 'white';
        }
        if((d[d.length-1] === suites[0]) || (d[d.length-1] === suites[1])){
          return 'black';
        }
        if((d[d.length-1] === suites[2]) || (d[d.length-1] === suites[3])){
          return 'red';
        }
    })
    .style('font-size', '14px')
    .style('font-weight', 700);

  }

  update(props) {

    console.log('riffle', props.iterVar );

    function riffle(cards){
      let randCardIndex = Math.floor(Math.random() * cards.length);
      let topCard = cards.shift();
      cards.splice(randCardIndex, 0, topCard);
      return cards;
    }

    cards = riffle(cards);
    console.log(cards);

    this.svg.selectAll('.card')
      .data(cards)
      .attr('fill', function(d) {
          if(d === 'K♦') {
          return 'red';
        } else {
          return '#FFFFFF';
        }
      });

    this.svg.selectAll('.card-text')
      .data(cards)
      .text(function(d) { return d; })
      .attr('fill', function(d) {
        if(d === 'K♦') {
          return 'white';
        }
        if((d[d.length-1] === suites[0]) || (d[d.length-1] === suites[1])){
          return 'black';
        }
        if((d[d.length-1] === suites[2]) || (d[d.length-1] === suites[3])){
          return 'red';
        }
    });
      
  }
}

module.exports = cardVis;
