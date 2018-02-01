import React, {Component} from 'react';
import {
  Card,
  Input,
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
          'type': 'botMessage',
        },
      ],
      'disableInput' : false,
      'userLoadingExist': false,
    }
  }

  handleButtonClick(){
    console.log(this.state.userInput);
    if (this.state.userInput.trim() !== ''){
      this.setState({
        dataList: this.state.dataList.map((data) => {
          if (data.type === 'userLoading'){
            return Object.assign({}, data, {
                'message': this.state.userInput.trim(),
                'type': 'userMessage',
              });
          } else{
            return data;
          }
        }),
      }, () => {
        this.setState({
          'dataList': this.state.dataList.concat([
            {
              'type': 'botLoading',
            }
          ]),
          'userInput': '',
          'disableInput' : true,
          'userLoadingExist': false,
        }, () => {
          this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
          setTimeout(()=>{
            this.setState({
              dataList: this.state.dataList.map((data) => {
                if (data.type === 'botLoading'){
                  return Object.assign({}, data, {
                      'message': 'Xin chào! Tôi là SUGE Bot. Tôi có thể giúp bạn việc gì?',
                      'type': 'botMessage',
                    });
                } else{
                  return data;
                }
              }),
              'disableInput': false,
            }, () => {
              this.chatBotMessageContainer.scrollTop = this.chatBotMessageContainer.scrollHeight;
              this.userInput.focus();
            });
          }, 1000);
        });
      });
    }else{
      this.setState({
        'userInput': '',
      }, () => {
        this.userInput.focus();
      });
    }
  }

  handleMessageContainerRef(node){
    this.chatBotMessageContainer = node;
  }

  handleInputRef(node){
    this.userInput = node;
  }

  handleOnKeyDown(e){
    if (e.keyCode === 13){
      this.handleButtonClick();
    }
  }

  handleOnInputChange(e){
    this.setState({
      'userInput': e.target.value,
    }, () => {
      if (!this.state.userLoadingExist && this.state.userInput.trim() !== ''){
        this.setState({
          'dataList': this.state.dataList.concat([
            {
              'message': '',
              'type': 'userLoading',
            }]),
            'userLoadingExist': true,
        });
      };
      if (this.state.userLoadingExist && this.state.userInput.trim() === ''){
        this.setState({
          'dataList': this.state.dataList.filter(data => data.type !== 'userLoading'),
          'userLoadingExist': false,
        });
      }
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
          <Ref innerRef = {this.handleMessageContainerRef.bind(this)}>
            <Card.Content className = 'ChatBotMessageContainer'>
              <MessageList dataList = {this.state.dataList} />
            </Card.Content>
          </Ref>
          <Card.Content>
            <Input
              disabled = {this.state.disableInput}
              fluid = {true}
              action = {{
                icon : 'chevron right',
                onClick: this.handleButtonClick.bind(this),
                loading: this.state.disableInput,
              }}
              value = {this.state.userInput}
              placeholder='Gõ và nhấn Enter để gửi'
              onKeyDown = {this.handleOnKeyDown.bind(this)}
              onChange = {this.handleOnInputChange.bind(this)}
              ref = {this.handleInputRef.bind(this)}
              >
            </Input>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default ChatBot;
