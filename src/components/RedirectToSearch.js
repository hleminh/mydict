import React, {Component} from 'react';
import { Redirect } from 'react-router';

class RedirectToSearch extends Component{
  render(){
    return(
      <Redirect to='/search' />
    );
  }
}

export default RedirectToSearch;
