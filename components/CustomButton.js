const React = require('react');

class CustomButton extends React.PureComponent {
  render() {
    const { onClick, hasError, updateProps, iter, points, ...props } = this.props;
    return (
      <button {...props} onClick={() => {
          let t = 0;
        let lastPoint = this.props.points[this.props.points.length - 1];

        if (lastPoint.y !== 1) {
            for (let t = 0; t < 10; t++) {
                setTimeout(() => {
                    updateProps({ iter: this.props.iter + 1 })
                }, 100 * t);
            }
        }
      }} />
    );
  }
}

export default CustomButton;