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
  Card,
  TextArea,
  Input,
  Divider,
  Label,
  Ref
} from 'semantic-ui-react';
import MessageList from './MessageList';

class ChatBot extends Component {

  constructor(props){
    super(props);
    this.state = {
      'userInput': '',
      'dataList': [
        {
          'message': 'Xin chào! Tôi là SUGE Bot. Tôi có thể giúp bạn việc gì?',
          'by': 'bot',
        },
      ],
    }
  }

  handleButtonClick(){
    console.log(this.state.userInput);
    if (this.state.userInput != ''){
      this.setState({
        'dataList': this.state.dataList.concat([
          {
            'message':this.state.userInput,
            'by': 'user',
          }
        ]),
        'userInput': '',
      }, ()=>{
        this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
        setTimeout(()=>{
          this.setState({
            'dataList': this.state.dataList.concat([
              {
                'message': 'Xin chào! Tôi là SUGE Bot. Tôi có thể giúp bạn việc gì?',
                'by': 'bot',
              }
            ]),
          }, () => {
            this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
          });
        }, 500)
      });
    }
  }

  handleRef(node){
    console.log(node);
    this.chatBotMessageContainer = node;
  }

  handleOnKeyDown(e){
    if (e.keyCode == 13){
      this.handleButtonClick();
    }
  }

  handleOnInputChange(e){
    this.setState({
      'userInput': e.target.value,
    });
  }

  render(){
    return(
      <div className = 'ChatBotContainer'>
        <Card className = 'ChatBot'>
          <Card.Content className = 'ChatBotHeaderContainer'>
            <Card.Header className = 'ChatBotHeader' textAlign = 'center'>
              SUGE Bot
            </Card.Header>
          </Card.Content>
          <Ref innerRef = {this.handleRef.bind(this)}>
            <Card.Content className = 'ChatBotMessageContainer'>
              <MessageList dataList = {this.state.dataList} />
            </Card.Content>
          </Ref>
          <Card.Content>
            <Input
              fluid = {true}
              action = {{
              icon : 'chevron right',
              onClick: this.handleButtonClick.bind(this),
              }}
              value = {this.state.userInput}
              placeholder='Gõ và nhấn Enter để gửi'
              onKeyDown = {this.handleOnKeyDown.bind(this)}
              onChange = {this.handleOnInputChange.bind(this)}
              >
            </Input>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default ChatBot;
