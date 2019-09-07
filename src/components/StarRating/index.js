import React from 'react'

import "./index.scss";

const Star = props => {
    // destructuring props
    const { selected = false, onClick, color, defaultColor, onHover, disabled, hovered, onFocus } = props
    const colored = (!disabled && selected) || hovered || (!onFocus && selected)
    return (
        <div className="star__wrapper" onMouseOver={onHover}>
            <i
                className={`fa fa-star star__icon`}
                aria-hidden="true"
                onClick={onClick}
                style={colored ? {
                        color: color
                    } : {
                        color: defaultColor
                    }
                }
            />
        </div>
    )
};

class StarRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starsSelected: 0,
            starsHovered: 0,
            onFocus: false
        };
        this.change = this.change.bind(this);
        this.getColor = this.getColor.bind(this);
        this.handleStarHover = this.handleStarHover.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    change(starsSelected) {
        this.setState({ ...this.state, starsSelected });
    }

    getColor() {
        const { colors } = this.props
        const starPosition = this.state.onFocus ? this.state.starsHovered : this.state.starsSelected
        const selectedColor = starPosition > colors.length ? colors[colors.length - 1] : colors[starPosition - 1]
        return selectedColor
    }

    handleStarHover(starsHovered) {
        this.setState({ ...this.state, starsHovered });
    }

    handleMouseEnter() {
        this.setState({ ...this.state, onFocus: true })
    }

    handleMouseLeave() {
        this.setState({ ...this.state, onFocus: false, starsHovered: 0 })
    }


    render() {
        // destructing props and state
        const { totalStars, comments, defaultColor } = this.props;
        const { starsSelected, starsHovered, onFocus } = this.state;
        return (
            <div className="star__container">
                <div className="star__header">Tell us your rating</div>
                <div
                    className="star-rating"
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                >
                    {[...Array(totalStars)].map((n, i) => (
                        <Star
                            key={i}
                            selected={i < starsSelected}
                            disabled={starsHovered <= i}
                            hovered={i < starsHovered}
                            onClick={() => this.change(i + 1)}
                            color={this.getColor()}
                            onHover={() => this.handleStarHover(i + 1)}
                            onFocus={onFocus}
                            defaultColor={defaultColor}
                        />
                    ))}
                </div>
                <div className="star__rating-comment">
                    {starsHovered > comments.length || (!onFocus && starsSelected > comments.length) ?
                        comments[comments.length - 1] :
                        comments[onFocus ? starsHovered - 1 : starsSelected - 1]
                    } 
                </div>
            </div>
        );
    }
}

export default StarRating;