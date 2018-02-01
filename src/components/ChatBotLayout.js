import React, {Component} from 'react';
import {
  Button,
  Icon,
  Popup,
} from 'semantic-ui-react';
import ChatBot from './ChatBot';

class ChatBotLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      'chatBoxOpen': false,
    }
  }

  handleButtonClick(e){
    if (this.state.chatBoxOpen){
      this.setState({
        'chatBoxOpen': false,
      }, () => {
      });
    }else{
      this.setState({
        'chatBoxOpen': true,
      });
    }
  }

  handleChatBotLayoutButtonRef(node){
    this.chatBotLayoutButton = node;
  }

  render(){
    return(
      <div className = 'ChatBotLayout'>
        {this.state.chatBoxOpen &&
          <ChatBot />
        }
        <br />
        <Popup
          trigger={
            <Button ref = {this.handleChatBotLayoutButtonRef.bind(this)} className = {this.state.chatBoxOpen?'SelectedChatBotLayoutButton':'ChatBotLayoutButton'} active = {this.state.chatBoxOpen} onClick = {this.handleButtonClick.bind(this)} size = 'huge' circular={true} color = 'blue' floated='right' icon={
              <Icon color = {this.state.chatBoxOpen?'blue':''} className='comments icon'>
              </Icon>
            }
            >
            </Button>
          }
          content={this.state.chatBoxOpen?'Bấm để tắt cửa sổ chat':'Chat với SUGE Bot'}
        />
    </div>
    );
  }
}

export default ChatBotLayout;
