const React = require('react');

class card extends React.Component {
    render() {

        const { idyll, hasError, updateProps, ...props } = this.props;
        let spanStyle = { fontWeight: '700' };
        const suits = {
            "S": "♠",
            "C": "♣",
            "H": "♥",
            "D": "♦"
        };

        if ((this.props.suit === "H") || (this.props.suit === "D")) {
            spanStyle.color = '#f44336';
        } else {
            spanStyle.color = 'black';
        }

        let cardToRender;
        if (this.props.number) {
            cardToRender = this.props.number + suits[this.props.suit]
        } else {
            cardToRender = suits[this.props.suit]
        }

        return (
            <span {...props} style={spanStyle}>
                {cardToRender}
            </span>
        );
    }
}

module.exports = card;
