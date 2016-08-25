// Redux dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Redux action creators
import * as actionCreators from '../actions/actionCreators';

// Page layout
import Layout from './layout';

// map the state to the react props
function mapStateToProps(state) {
    return {
        recipes: state.recipes,
        categories: state.categories
    };
}

// map the dispatch and action creators to the react props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

// Connect the state and dispatch to the Layout component
const App = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default App;