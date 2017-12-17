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
  componentDidMount(){
    this.setState({
      category: 'jpn-vie',
      value: ''
    });
  }

  componentWillMount() {
    this.setState({
      value: this.props.value
    });
  }

  resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

  handleSubmitButton(e) {
    e.preventDefault();
    this.props.handleSearchSubmit(this.state.value, this.state.category);
  };

  handleResultSelect = (e, {result}) => {
    this.setState({value: result.origin});
    this.refs.searchInput.value = result.origin;
    this.props.handleSearchSubmit(result.origin, this.state.category);
  }

  onCategoryChange(e, {value}){
    this.setState({category: value});
    this.props.onCategoryChange(value);
  }

  handleSearchChange = (e, {value}) => {
    var kata = "false";
    this.setState({isLoading: true, value})

    setTimeout(() => {
      if (this.state.value.length < 1){
        return this.resetComponent();
      }
      if (this.state.value === this.state.value.toUpperCase()){
        kata = "true";
      }
      $.ajax({
        'url': '/entry/' + this.state.category + '?filter=' + value + '&kata=' + kata ,
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
      value: "jpn-vie"
      },
      {
      text: "Việt - Nhật",
      value: "vie-jpn"
      },
    ]

    return (
      <div className="SearchBarContainer">
        <h1>SUGE myDict</h1>
        <Image centered size='small' src={banner} style={{
        }}/>
        <h2>Từ điển Nhật-Việt/Việt-Nhật</h2>
        <span className = "SearchBar">
          <Dropdown ref="option" defaultValue="jpn-vie" selection options={searchOptions} onChange = {this.onCategoryChange.bind(this)}/>
          <Search
            loading={this.state.isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={this.state.results}
            resultRenderer={resultRenderer}
            size="large"
            aligned="left"
            input={
              <div>
                <div className="ui icon input">
                <input ref="searchInput" type="text" tabIndex="0" className="prompt" autoComplete="off" defaultValue={this.state.value} placeholder="Nhập từ khóa tìm kiếm..."/>
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
