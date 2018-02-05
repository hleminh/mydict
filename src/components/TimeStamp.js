import React, {Component} from 'react';

class TimeStamp extends React.Component {
    constructor() {
        super();

        var today = new Date();
        var date = today.getHours() + ":" + today.getMinutes();

        this.state = {
            date: date
        };
    }

    render() {
        return (
            <span className='date'>
                {this.props.by} {this.state.date}
            </span>
        );
    }
}

export default TimeStamp;
