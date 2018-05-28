const React = require('react');

class KingOfDiamonds extends React.Component {
  render() {

    const { idyll, hasError, updateProps, ...props } = this.props;
    const sapnStyle = {
	  color: 'red',
	  fontWeight: '700'
	};
	
    return (
      <span {...props} style={sapnStyle}>
        K♦
      </span>
    );
  }
}

module.exports = KingOfDiamonds;
