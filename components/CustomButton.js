const React = require('react');

class CustomButton extends React.PureComponent {
  render() {
    const { onClick, hasError, updateProps, iter, ...props } = this.props;
    return (
      <button {...props} onClick={() => {
        for (let t = 0; t < 10; t++) {
          console.log(t, iter);
          setTimeout(() => {
            updateProps({ iter: this.props.iter + 1 })
          }, 20 * t);
        }
      }} />
    );
  }
}

export default CustomButton;