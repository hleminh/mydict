import React, {Component} from 'react';
import '../App.css';
import EntryList from './EntryList';
import SearchBar from './SearchBar';
import {Container} from 'semantic-ui-react';

class SearchPage extends Component {

  render() {
    return (
        <div className = "Body">
          <Container text>
            <SearchBar value = {this.props.value} handleSearchSubmit = {this.props.handleSearchSubmit} onCategoryChange = {this.props.onCategoryChange}/>
            <EntryList userAccount = {this.props.userAccount} handleDeleteSubmit = {this.props.handleDeleteSubmit} handleEditSubmit = {this.props.handleEditSubmit} dataList = {this.props.dataList} />
          </Container>
        </div>);
  }
}

export default SearchPage;
