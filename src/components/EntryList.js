import React, { Component } from 'react';
import Entry from './Entry';

class EntryList extends Component {
  componentDidMount() {
  };

  componentWillReceiveProps(nextProps){
  }

  render() {
    const entries = this.props.dataList.map((data) => (
      <Entry handleDeleteSubmit = {this.props.handleDeleteSubmit} handleEditSubmitButton = {this.props.handleEditSubmit} key = {data._id} data = {data}/>
    ));

    return (
      <div className="EntryList">
        {entries}
      </div>
    );
  }
}

export default EntryList;
