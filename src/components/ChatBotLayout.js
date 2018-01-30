import React, {Component} from 'react';
import {
  Container,
  Image,
  Menu,
  Modal,
  Button,
  Form,
  Message,
  Dropdown,
  Comment,
  Icon,
} from 'semantic-ui-react';
import ChatBot from './ChatBot';

class ChatBotLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      'chatBoxOpen': false,
    }
  }

  handleButtonClick(){
    if (this.state.chatBoxOpen){
      this.setState({
        'chatBoxOpen': false,
      });
    }else{
      this.setState({
        'chatBoxOpen': true,
      });
    }
  }

  render(){
    return(
      <div className = 'ChatBotLayout'>
        {this.state.chatBoxOpen &&
          <ChatBot />
        }
        <br />
        <Button onClick = {this.handleButtonClick.bind(this)} size = 'huge' circular={true} color = 'blue' floated='right' icon={
          <Icon className='comments icon'>
          </Icon>
        }
        >
        </Button>
    </div>
    );
  }
}

export default ChatBotLayout;
