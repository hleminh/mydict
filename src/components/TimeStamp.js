import React, {Component} from 'react';

class TimeStamp extends React.Component {
    constructor() {
        super();
        var today = new Date(),
            date = today.getHours() + ':' + today.getMinutes();
        this.state = {
            date: date
        };
    }

    render() {
        return (
            <span className='Date'>
                {this.state.date}
            </span>
        );
    }
}

export default TimeStamp;
