import React from 'react';
import classNames from 'classnames';

import Sidebar from '../containers/Sidebar';
import Review from '../containers/Review';
import Stats from '../containers/Stats';

import './AppContainer.scss';

class AppContainer extends React.Component {
    constructor(props: Object) {
        super(props);

        this.props.onFetchData();
    }

    render() {
        return(
            <div className="app-container">
                <Sidebar />
                <div className="reviewing-container">
                    <Review />
                    <Stats />
                </div>
            </div>
        );
    }
}

export default AppContainer;