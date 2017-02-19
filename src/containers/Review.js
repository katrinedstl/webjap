import { connect } from 'react-redux';
import { updateInput, submitInput } from '../actions'

import Review from '../components/Review';

const mapStateToProps = (state, ownProps) => {
    const { items, currentlyReviewing, previousWord, currentWord, input } = state;

    const { number } = currentWord;

    let reviewing = false;

    if(currentlyReviewing.length > 0) {
        reviewing = true;
    }

    return {
        items,
        currentWord,
        number,
        input,
        previousWord,
        reviewing
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUpdateInput: function(value) {
            dispatch(updateInput(value));
        },
        onSubmitInput: function(value) {
            dispatch(submitInput(value));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Review)