import React, {Component} from 'react';
import './App.css';
import $ from 'jquery';
import MenuLayout from './components/MenuLayout';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import RedirectToSearch from './components/RedirectToSearch';
import SearchPage from './components/SearchPage';
import AboutPage from './components/AboutPage';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataList: [],
      category: 'jpn-vie',
      keyword: '',
    };
  }

  handleNewSubmit(entry, category, callback){
    console.log('handleNewSubmit');
    console.log(entry);
    console.log(category);
    var oldData = entry;
    $.ajax({
      'url': '/entry/' + category,
      'type': 'POST',
      'context': this,
      'data': entry,
      success: function(result) {
        console.log('result: ', result);
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
    console.log(entry);
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
        console.log('result: ', result);
        this.setState({
          dataList: this.state.dataList.filter(data => data._id !== id),
        });
        callback(true, null);
      },
      error: function(result) {
        callback(false, result);
      }
    });
  }

  onCategoryChange(category){
    if (this.state.category!== category){
      this.setState({
        category: category,
      }, () => {
      });
    }
  }

  render() {
    return (
      <div className="App">
        <MenuLayout handleNewSubmit = {this.handleNewSubmit.bind(this)}/>
        <Switch>
          <Route exact path = '/' component = {RedirectToSearch} />
          <Route exact path = '/about' component = {AboutPage} />
          <Route exact path = '/search' render = { () =>
            <SearchPage
              handleSearchSubmit = {this.handleSearchSubmit.bind(this)}
              onCategoryChange = {this.onCategoryChange.bind(this)}
              handleDeleteSubmit = {this.handleDeleteSubmit.bind(this)}
              handleEditSubmit = {this.handleEditSubmit.bind(this)}
              dataList = {this.state.dataList}
            />
          }
          />
        </Switch>
    </div>);
  }
}

export default App;
