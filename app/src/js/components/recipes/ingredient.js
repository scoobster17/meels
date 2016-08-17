import React from 'react';
import Option from '../global/option';

export default class Ingredient extends React.Component {

    constructor() {
        super();

        this._updateUnitIndicator = this._updateUnitIndicator.bind(this);
    }

    render() {

        const units = [' (none)', 'g (grams)', 'kg (kilograms)', 'tsp (teaspoons)', 'tbsp (tablespoons)', 'ml (millilitres)', 'l (litres)', 'lb (pounds)'];
        const noOfUnits = units.length;
        let unitOptions = [];

        for (let l=0; l<noOfUnits; l++) {
            let split = units[l].split(' (');
            let text = split[1] ? split[1].substring(0, split[1].length-1) : '';
            let value = split[0];
            unitOptions.push(<Option text={text} value={value} key={l} />);
        }

        return (
            <fieldset data-ingredient-number={this.props.index}>
                <div className="field">
                    <label htmlFor={"ingredient-name-" + this.props.index}>Ingredient Name</label>
                    <input type="text" id={"ingredient-name-" + this.props.index} name={"ingredient-name-" + this.props.index} placeholder="Salt" />
                </div>
                <div className="field">
                    <label htmlFor={"ingredient-unit-" + this.props.index}>Unit</label>
                    <select id={"ingredient-unit-" + this.props.index} name={"ingredient-unit-" + this.props.index} data-ingredient-number={this.props.index} onChange={this._updateUnitIndicator}>
                        {unitOptions}
                    </select>
                </div>
                <div className="field">
                    <label htmlFor={"ingredient-measure-" + this.props.index}>Measure</label>
                    <input type="text" id={"ingredient-measure-" + this.props.index} name={"ingredient-measure-" + this.props.index} placeholder="A pinch / 3 / 100" />
                    <p id={"unit-indicator-" + this.props.index} className="unitIndicator" aria-hidden="true"></p>
                </div>
            </fieldset>
        )
    }

    _updateUnitIndicator(event) {
        const unit = event.target.value;
        const ingredientNumber = event.target.parentNode.parentNode.getAttribute('data-ingredient-number');
        const unitIndicator = document.querySelector('#unit-indicator-' + ingredientNumber);
        unitIndicator.innerHTML = unit;
    }
}