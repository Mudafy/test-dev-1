import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../actions';


/**
 * We keep the UI state local, decoupled from the *REDUX STATE*.
 */

class Searchbox extends Component {
    handleTextChange(event) {
        this.setState({ text: event.target.value });
    }

    componentDidMount() {
        this.setState({ text: '' });
    }

    render() {
        return (
            <div className="searchbox">
                <h2>Searchbox</h2>
                <input type="text" onChange={event => this.handleTextChange(event)} />
                <button onClick={() => this.props.doSearch(this.state.text)}>Search</button>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doSearch: (text) => dispatch(ACTIONS.searchFor(text))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Searchbox);
