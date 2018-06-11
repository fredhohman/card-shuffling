const React = require('react');

class multiRiffle extends React.PureComponent {
  render() {
    const { onClick, hasError, updateProps, iter, points, ...props } = this.props;
    return (
      <button {...props} onClick={() => {

        let t = 0;
        let lastPoint = this.props.points[this.props.points.length - 1];

        if (lastPoint.y !== 1) {
          for (let t = 0; t < 10; t++) {
            setTimeout(() => {

              lastPoint = this.props.points[this.props.points.length - 1];
              if (lastPoint.y !== 1) {
                updateProps({ iter: this.props.iter + 1 });
              }

            }, 80 * t);
          }
        }
      }} />
    );
  }
}

export default multiRiffle;