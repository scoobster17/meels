import React from 'react';

export default class Instruction extends React.Component {
    render() {
        return (
            <div className="field">
                <label htmlFor={"instruction-" + this.props.index}>Step {this.props.index}</label>
                <textarea id={"instruction-" + this.props.index} name={"instruction-" + this.props.index} ref="new-instruction" placeholder="Pre-heat oven to 200&deg; Celcius for a total of 20 minutes."></textarea>
            </div>
        )
    }
}