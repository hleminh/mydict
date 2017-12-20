import React, {Component} from 'react';
import './App.css';
import $ from 'jquery';
import MenuLayout from './components/MenuLayout';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import RedirectToSearch from './components/RedirectToSearch';
import SearchPage from './components/SearchPage';
import AboutPage from './components/AboutPage';
import SavedPage from './components/SavedPage';
import update from 'react-addons-update';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataList: [],
      savedList: [],
      category: 'jpn_vie',
      keyword: '',
    };
  }

  handleNewSubmit(entry, category, callback){
    // console.log('handleNewSubmit');
    // console.log(entry);
    // console.log(category);
    var oldData = entry;
    $.ajax({
      'url': '/entry/' + category,
      'type': 'POST',
      'context': this,
      'data': entry,
      success: function(result) {
        // console.log('result: ', result);
        if (result.origin === this.state.keyword || result.kana === this.state.keyword){
          this.setState({dataList: this.state.dataList.concat(result)});
        }
        callback(true, null);
      },
      error: function(result){
        callback(false, oldData);
      },
    });
  }

  handleSignUpSubmit(credentials, callback){
    // console.log(credentials);
    var oldData = credentials;
    $.ajax({
      'url': '/user/register',
      'type': 'POST',
      'context': this,
      'data': credentials,
      success: function(result) {
        callback(true, null);
      },
      error: function(result){
        callback(false, oldData);
      },
    });
  }

  handleSignInSubmit(credentials, callback){
    // console.log(credentials);
    var oldData = credentials;
    $.ajax({
      'url': '/user/login',
      'type': 'POST',
      'context': this,
      'data': credentials,
      success: function(result) {
        this.setState({userAccount: result}, () => {
          $.ajax({
            'url': '/user/get/' + this.state.userAccount.user._id,
            'type': 'GET',
            'context': this,
            success: function(nestedResult) {
              // console.log(nestedResult);
              var trueNestedResult = [];
              for (var element in nestedResult){
                trueNestedResult.push(nestedResult[element].item);
              }
              this.setState({savedList: trueNestedResult}, () => {
                callback(true, null);
              });
            },
            error: function(nestedResult){
              callback(false, oldData);
            },
          });
        });
        // console.log(result);
      },
      error: function(result){
        callback(false, oldData);
      },
    });
  }

  handleSignOutSubmit(credentials, callback){
    this.setState({userAccount: ''});
  }

  handleSearchSubmit(keyword) {
    $.ajax({
      'url': '/entry/' + this.state.category + '?filter=' + keyword,
      'type': 'GET',
      'context': this,
      success: function(result) {
        this.setState({dataList: result, keyword: keyword});
      }
    });
  };

  handleEditSubmit(entry, callback){
    // console.log(entry);
    var oldData;
    this.setState({
      dataList: this.state.dataList.map((data) => {
        if (entry._id === data._id){
          oldData = data;
          return Object.assign({}, data, {
              _id: data._id,
              id: data.id,
              origin: entry.origin,
              kana: entry.kana,
              definition: entry.definition,
            });
        } else{
          return data;
        }
      }),
    });
    $.ajax({
      'url': '/entry/' + this.state.category +'/' + entry._id,
      'type': 'PUT',
      'context': this,
      'data': entry,
      success: function(result) {
        callback(true);
      },
      error: function(result){
        this.setState({
          dataList: this.state.dataList.map((data) => {
            if (entry._id === data._id){
              return Object.assign({}, data, {
                  _id: data._id,
                  id: oldData.id,
                  origin: oldData.origin,
                  kana: oldData.kana,
                  definition: oldData.definition,
                });
            } else{
              return data;
            }
          }),
        });
        callback(false);
      },
    });
  }

  handleDeleteSubmit(id, callback){
    $.ajax({
      'url': '/entry/' + this.state.category + '/' + id,
      'type': 'DELETE',
      'context': this,
      success: function(result) {
        // console.log('result: ', result);
        this.setState({
          dataList: this.state.dataList.filter(data => data._id !== id),
        }, () => {
          callback(true, null);
        });
      },
      error: function(result) {
        callback(false, result);
      }
    });
  }

  handleSaveSubmit(entry, callback){
    // console.log(entry);
    entry.kind = this.state.category;
    // console.log(entry);
    $.ajax({
      'url': '/user/save/' + this.state.userAccount.user._id,
      'type': 'POST',
      'context': this,
      'data': entry,
      success: function(result) {
        // console.log('save submit result ', result);
        this.setState({
          savedList: update(this.state.savedList,
            { $push: [entry] }
          ),
          userAccount: update(this.state.userAccount,
            {user: {$set: result}}
          ),
        }, () => {
          // console.log(this.state.savedList);
          callback(true, null);
        });
      },
      error: function(result) {
        callback(false, result);
      }
    });
  }

  handleUnSaveSubmit(entry, callback){
    $.ajax({
      'url': '/user/unsave/' + this.state.userAccount.user._id,
      'type': 'POST',
      'context': this,
      'data': entry,
      success: function(result) {
        // console.log('unsave submit result ', result);
        this.setState({
          savedList: update(this.state.savedList,
            { $splice: [[this.state.savedList.indexOf(entry), 1]] }
          ),
          userAccount: update(this.state.userAccount,
            {user: {$set: result}}
          ),
        }, () => {
          // console.log(this.state.savedList);
          callback(true, null);
        });
      },
      error: function(result) {
        callback(false, result);
      }
    });
  }

  onCategoryChange(category){
    if (this.state.category !== category){
      this.setState({
        category: category,
        dataList: [],
        keyword: '',
      }, () => {
        // console.log(this.state.category);
      });
    }
  }

  render() {
    return (
      <div className="App">
        <MenuLayout userAccount={this.state.userAccount} handleSignOutSubmit = {this.handleSignOutSubmit.bind(this)}handleSignInSubmit = {this.handleSignInSubmit.bind(this)} handleSignUpSubmit = {this.handleSignUpSubmit.bind(this)} handleNewSubmit = {this.handleNewSubmit.bind(this)}/>
        <Switch>
          <Route exact path = '/' component = {RedirectToSearch} />
          <Route exact path = '/about' component = {AboutPage} />
          <Route exact path = '/search' render = { () =>
            <SearchPage
              handleSearchSubmit = {this.handleSearchSubmit.bind(this)}
              onCategoryChange = {this.onCategoryChange.bind(this)}
              handleDeleteSubmit = {this.handleDeleteSubmit.bind(this)}
              handleEditSubmit = {this.handleEditSubmit.bind(this)}
              handleSaveSubmit = {this.handleSaveSubmit.bind(this)}
              handleUnSaveSubmit = {this.handleUnSaveSubmit.bind(this)}
              dataList = {this.state.dataList}
              userAccount = {this.state.userAccount}
              keyword = {this.state.keyword}
              category = {this.state.category}
            />
          }
          />
          <Route exact path = '/saved' render = { () =>
            <SavedPage
              handleDeleteSubmit = {this.handleDeleteSubmit.bind(this)}
              handleEditSubmit = {this.handleEditSubmit.bind(this)}
              handleSaveSubmit = {this.handleSaveSubmit.bind(this)}
              handleUnSaveSubmit = {this.handleUnSaveSubmit.bind(this)}
              dataList = {this.state.savedList}
              userAccount = {this.state.userAccount}
            />
          }
          />
        </Switch>
    </div>);
  }
}

export default App;
