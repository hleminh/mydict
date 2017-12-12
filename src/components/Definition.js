import React, { Component } from 'react';

class Definition extends Component {
  render() {
    return (
      <span className="Definition">
        {this.props.definition}
      </span>
    );
  }
}

export default Definition;
