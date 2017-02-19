import { connect } from 'react-redux';

import Sidebar from '../components/Sidebar';
import { selectChapter, selectAll, resetSelection, startReviewing } from '../actions';

const mapStateToProps = (state, ownProps) => {
    const { itemTree : chapters, selectedChapters, currentlyReviewing } = state;

    return {
        chapters,
        selectedChapters,
        currentlyReviewing
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSelectChapter: function(chapterId) {
            dispatch(selectChapter(chapterId));
        },
        onSelectAll: function() {
            dispatch(selectAll());
        },
        onResetSelection: function() {
            dispatch(resetSelection());
        },
        onStartReviewing: function() {
            dispatch(startReviewing());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar)