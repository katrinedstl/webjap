import React from 'react';

import './Stats.scss';

const Stat = ({stat, value}) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const removeUnderscore = (string) => {
        return string.replace(/_|-/g, " \n");
    }

    return(
        <div className="stat-item">
            <div className="stat-value">{value}</div>
            <p>{removeUnderscore(capitalizeFirstLetter(stat))}</p>
        </div>
    )
}

class Stats extends React.Component {
    constructor(props: Object) {
        super(props);
    }

    render() {
        const { stats } = this.props;

        return(
            <div className="stats">
                <div className="stat-items">
                    {Object.keys(stats).map(function(stat, index) {
                        return(<Stat key={index} stat={stat} value={stats[stat]}/>);
                    })}
                </div>
            </div>
        );
    }
}

export default Stats;