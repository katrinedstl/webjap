import { connect } from 'react-redux';

import AppContainer from '../components/AppContainer';
import { fetchData } from '../actions';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onFetchData: function() {
            dispatch(fetchData());
        },
    }
}

export default connect(
    undefined,
    mapDispatchToProps
)(AppContainer)