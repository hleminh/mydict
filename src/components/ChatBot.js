import React, {Component} from 'react';
import $ from 'jquery';
import {
  Card,
  Input,
  Ref
} from 'semantic-ui-react';
import MessageList from './MessageList';

const steps = [
  {
    'id':'-1',
    'message': 'Xin lỗi, tôi không hiểu ý của bạn. Xin hãy thử lại.',
    'next': '0',
  },
  {
    'id': '0',
    'message': 'Xin chào! Tôi là SUGE Bot. Tôi có thể giúp bạn việc gì?\n1. Tìm từ Nhật - Việt\n2. Tìm từ Việt - Nhật',
    'options': [
      {
        'case': '1',
        'next': '0-1i'
      },
      {
        'case': '2',
        'next': '0-2i'
      }
    ]
  },
  {
    'id': '0-1i',
    'message': 'Xin hãy nhập từ tiếng Nhật',
    'next': '0-1p',
  },
  {
    'id': '0-2i',
    'message': 'Xin hãy nhập từ tiếng Việt',
    'next': '0-2p',
  },
  {
    'id': '0-1p',
    'action': function(callback, keyword){
      $.ajax({
        'url': '/entry/jpn_vie?filter=' + keyword,
        'type': 'GET',
        'context': this,
        success: function(result) {
          var processedResult = '';
          console.log(result);
          for (var eachResult in result){
            processedResult += `${result[eachResult].origin} ${result[eachResult].kana} ${result[eachResult].definition}\n`;
          }
          callback(processedResult);
        }
      });
    },
    'next': 'result',
  },
  {
    'id': '0-2p',
    'action': function(callback, keyword){
      $.ajax({
        'url': '/entry/vie_jpn?filter=' + keyword,
        'type': 'GET',
        'context': this,
        success: function(result) {
          var processedResult = '';
          console.log(result);
          for (var eachResult in result){
            processedResult += `${result[eachResult].origin} ${result[eachResult].kana} ${result[eachResult].definition}\n`;
          }
          callback(processedResult);
        }
      });
    },
    'next': 'result',
  },
  {
    'id': 'result',
    'message': '',
    'next': '0',
  }
];

class ChatBot extends Component {

  constructor(props){
    super(props);
    this.state = {
      'userInput': '',
      'dataList': [
        {
          'message': steps[1].message,
          'type': 'botMessage',
        },
      ],
      'disableInput' : false,
      'userLoadingExist': false,
      'currentStep': steps[1],
    }
  }

  nextStep(currentStep, data){
    switch(currentStep){
      case 'options':
        console.log('options');
        for (let step in steps){
          if (data.next === steps[step].id){
            this.setState({
                'currentStep': steps[step],
              }, () => {
                this.botReply();
                if (this.state.currentStep.action){
                  console.log('next step is action');
                  this.botProcess();
                }
              }
            )
          }
        }
        break;
      case 'action':
        console.log('action');
        for (let step in steps){
          if (this.state.currentStep.next === steps[step].id){
            steps[step].message = data;
            this.setState({
                'currentStep': steps[step],
              }, () => {
                this.botReply();
                if (this.state.currentStep.action){
                  console.log('next step is action');
                  this.botProcess();
                }
              }
            )
          }
        }
        break;
      case 'message':
        console.log('message');
        for (let step in steps){
          if (this.state.currentStep.next === steps[step].id){
            this.setState({
                'currentStep': steps[step],
              }, () => {
                if (!this.state.currentStep.action){
                  this.botReply();
                }
                else {
                  console.log('next step is action');
                  this.botProcess();
                }
              }
            )
          }
        }
        break;
      default:
        console.log('err');
        for (let step in steps){
          if ('-1' === steps[step].id){
            this.setState({
                'currentStep': steps[step],
              }, () => {
                if (!this.state.currentStep.action){
                  this.botReply();
                }
                else {
                  console.log('next step is action');
                  this.botProcess();
                }
              }
            )
          }
        }
    }
  }

  botProcess(){
    console.log(this.state.currentStep.id);
    if (this.state.currentStep.options){
      console.log('process options');
      for (let option in this.state.currentStep.options){
        if (this.state.userInput === this.state.currentStep.options[option].case){
          console.log('User picked option: ' +  this.state.userInput);
          this.nextStep('options', this.state.currentStep.options[option]);
          return;
        }
      }
      this.nextStep('err');
    } else if (this.state.currentStep.action){
      console.log('process action');
      this.state.currentStep.action((result) => {
        this.nextStep('action', result);
      }, this.state.userInput);
    } else {
      console.log('process message');
      this.nextStep('message');
    }
  }

  botReply(){
    console.log('reply ' + this.state.currentStep.id);
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
                  'message': this.state.currentStep.message,
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
          if (this.state.currentStep.next === '0'){
            this.nextStep('message');
          }
        });
      }, 1000);
    });
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
        this.botProcess();
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
