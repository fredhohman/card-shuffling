const React = require('react');

class CustomComponent extends React.Component {

  componentDidCatch(e) {
    console.log(e);
  }
  render() {
    const { hasError, updateProps, children, ...props } = this.props;
    return (
      <img {...props} />
    );
  }
}

module.exports = CustomComponent;