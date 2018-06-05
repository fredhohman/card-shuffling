const React = require('react');

class card extends React.Component {
  render() {

    const { idyll, hasError, updateProps, ...props } = this.props;
    
    let spanStyle;
    const suits = {"S":"♠", "C":"♣", "H":"♥", "D":"♦"}

    if ((this.props.suit === "H") || (this.props.suit === "D")) {
        spanStyle = {
            color: 'red',
            fontWeight: '700'
        };
    } else {
        spanStyle = {
            color: 'black',
            fontWeight: '700'
        };
    }
    let cardToRender;
    if (this.props.number) {
        cardToRender = this.props.number + suits[this.props.suit]  
    } else {
        cardToRender = suits[this.props.suit]  
    }

    console.log('card props', this.props)
    
    return (
      <span {...props} style={spanStyle}>
        {cardToRender}
      </span>
    );
  }
}

module.exports = card;
