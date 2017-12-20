import React, {Component} from 'react';
import {Search, Dropdown, Image} from 'semantic-ui-react';
import banner from '../assets/images/banner.png'

import $ from 'jquery';

const resultRenderer = ({origin, kana}) => [
  <span>
    <strong>{origin}</strong>&nbsp;&nbsp;{kana}
  </span>
]

class SearchBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      results: [],
    }
  }

  resetComponent = () => this.setState({isLoading: false, results: []});

  handleSubmitButton(e) {
    e.preventDefault();
    this.props.handleSearchSubmit(this.refs.searchInput.value);
  };

  handleResultSelect = (e, {result}) => {
    this.refs.searchInput.value = result.origin;
    this.props.handleSearchSubmit(result.origin);
  }

  onCategoryChange(e, {value}){
    this.resetComponent();
    this.refs.searchInput.value = '';
    this.props.onCategoryChange(value);
  }

  handleOnMouseDown(e){
    // e.preventDefault();
  }

  handleSearchChange = (e, {value}) => {
    var kata = "false";
    this.setState({isLoading: true});

    setTimeout(() => {
      if (value.length < 1){
        return this.resetComponent();
      }
      if (value === value.toUpperCase()){
        kata = "true";
      }
      $.ajax({
        'url': '/entry/' + this.props.category + '?filter=' + value + '&kata=' + kata ,
        'type': 'GET',
        'context': this,
        success: function(result) {
          this.setState({isLoading: false, results: result});
        }
      });
    }, 100)
  }

  render() {
    const searchOptions = [
      {
      text: "Nhật - Việt",
      value: "jpn_vie"
      },
      {
      text: "Việt - Nhật",
      value: "vie_jpn"
      },
    ]

    return (
      <div className="SearchBarContainer">
        <h1>SUGE myDict</h1>
        <Image centered size='small' src={banner} style={{
        }}/>
        <h2>Từ điển Nhật-Việt/Việt-Nhật</h2>
        <span className = "SearchBar">
          <Dropdown ref="option" value={this.props.category}
            selection
            options={searchOptions}
            onChange = {this.onCategoryChange.bind(this)}/>
          <Search
            loading={this.state.isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={this.state.results}
            resultRenderer={resultRenderer}
            onMouseDown = {this.handleOnMouseDown.bind(this)}
            size="large"
            aligned="left"
            value = {this.props.keyword}
            input={
              <div>
                <div className="ui icon input">
                <input ref="searchInput" type="text" tabIndex="0" className="prompt" autoComplete="off" defaultValue={this.props.keyword} placeholder="Nhập từ khóa tìm kiếm..."/>
                <i aria-hidden="true" className="search icon" onClick={this.handleSubmitButton.bind(this)}></i>
                </div>
              </div>
            }
            noResultsMessage ='Không tìm thấy kết quả'
          />
        </span>
      </div>);
  }
}

export default SearchBar;
