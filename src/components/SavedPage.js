import React, {Component} from 'react';
import '../App.css';
import EntryList from './EntryList';
import {Container} from 'semantic-ui-react';
import {Redirect} from 'react-router';

class SavedPage extends Component {
  render() {
    if (this.props.userAccount){
      return (
          <div className = "Body">
            <Container text>
              <EntryList
                userAccount = {this.props.userAccount}
                handleDeleteSubmit = {this.props.handleDeleteSubmit}
                handleEditSubmit = {this.props.handleEditSubmit}
                handleSaveSubmit = {this.props.handleSaveSubmit}
                handleUnSaveSubmit = {this.props.handleUnSaveSubmit}
                dataList = {this.props.dataList} />
            </Container>
          </div>);
    } else{
      return(
        <Redirect to='/search'/>
      );
    }

  }
}

export default SavedPage;
