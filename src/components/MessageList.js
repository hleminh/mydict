import React, {Component} from 'react';
import {
  Image,
  Label,
  Grid,
  Popup
} from 'semantic-ui-react';
import RobotPNG from '../assets/images/bot2.png';
import BotLoadingGIF from '../assets/images/dot1.gif';
import UserLoadingGIF from '../assets/images/dot3.gif';
import TimeStamp from './TimeStamp';

class MessageList extends Component {

  render(){
    const messages = this.props.dataList.map((data) => {
      if (data.type === 'userMessage'){
        return (
          <Grid.Row className = "MessageContainer">
            <Grid.Column className = "UserMessageCol" verticalAlign = 'middle' >
              <Popup trigger = {
                <Label className = "UserMessage" size = 'large' color = 'blue' pointing = 'right'>
                  {data.message}
                </Label>
              }
              content = {
                <TimeStamp />
              }
              />
            </Grid.Column>
          </Grid.Row>
        );
      } else if (data.type === 'botMessage'){
        return (
          <Grid.Row className = "MessageContainer">
            <Grid.Column className = "BotAvatarCol" width = {2} verticalAlign = 'middle'>
              <Popup trigger = {
                <Image inline = {true} verticalAlign = 'middle' src = {RobotPNG} size = 'mini' circular = {true} bordered = {true}/>
              }
              content = {
                <TimeStamp />
              }
              />
            </Grid.Column>
            <Grid.Column className = "BotMessageCol" width = {14} verticalAlign = 'middle'>
              <Label as = 'span' className = "BotMessage" size = 'large' pointing = 'left'>
                {data.message}
              </Label>
            </Grid.Column>
          </Grid.Row>
        );
      } else if (data.type === 'botLoading'){
        return(
          <Grid.Row className = "MessageContainer">
            <Grid.Column className = "BotAvatarCol" width = {2} verticalAlign = 'middle'>
              <Popup trigger = {
                <Image inline = {true} verticalAlign = 'middle' src = {RobotPNG} size = 'mini' circular = {true} bordered = {true}/>
              }
              content = 'SUGE Bot'
              />
            </Grid.Column>
            <Grid.Column className = "BotMessageCol" width = {14} verticalAlign = 'middle'>
              <Popup trigger = {
                <Label as = 'span' className = "BotMessage" size = 'large' pointing = 'left'>
                  <Image verticalAlign = 'middle' src = {BotLoadingGIF} size = 'mini' />
                </Label>
              }
              content = 'SUGE Bot đang nhập...'
              />
            </Grid.Column>
          </Grid.Row>
        );
      } else if (data.type === 'userLoading'){
        return(
          <Grid.Row className = "MessageContainer">
            <Grid.Column className = "UserMessageCol" verticalAlign = 'middle' >
              <Popup trigger = {
                <Label className = "UserMessage" size = 'large' color = 'blue' pointing = 'right'>
                  <Image verticalAlign = 'middle' src = {UserLoadingGIF} size = 'mini' />
                </Label>
              }
              content = 'Tôi đang nhập...'
              />
            </Grid.Column>
          </Grid.Row>
        );
      } else return null;
    });

    return(
      <Grid className = 'MessageList'>
        {messages}
      </Grid>
    );
  }
}

export default MessageList;
