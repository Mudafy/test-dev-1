import React, { Component } from 'react';
import { connect } from 'react-redux';

import Searchbox from './searchbox.jsx';
import Resultbox from './resultbox.jsx';


class App extends Component {
    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                <Searchbox />
                <Resultbox results={this.props.results} />
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        results: state.results,
        text: state.text,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
