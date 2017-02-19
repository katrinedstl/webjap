import { connect } from 'react-redux';

import Stats from '../components/Stats';

const mapStateToProps = (state, ownProps) => {
    const { stats } = state;

    return {
        stats,
    }
}

export default connect(
    mapStateToProps,
    undefined
)(Stats)