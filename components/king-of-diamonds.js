const React = require('react');

class KingOfDiamonds extends React.Component {
  render() {

    const { idyll, hasError, updateProps, ...props } = this.props;
    const spanStyle = {
      color: 'red',
      fontWeight: '700'
    };
	
    return (
      <span {...props} style={spanStyle}>
        K♦
      </span>
    );
  }
}

module.exports = KingOfDiamonds;
