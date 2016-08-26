// Redux dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Redux action creators
import * as actionCreators from '../actions/actionCreators';

// map the state to the react props
export function mapStateToProps(state) {
    return {
        recipes: state.recipes,
        categories: state.categories
    };
}

// map the dispatch and action creators to the react props
export function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}