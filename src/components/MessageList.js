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
  Label,
  Grid,
} from 'semantic-ui-react';
import RobotPNG from '../assets/images/bot2.png';

class MessageList extends Component {

  render(){
    const messages = this.props.dataList.map((data) => {
      if (data.by === 'user'){
        return (
          <Grid.Row className = "MessageContainer">
            <Grid.Column className = "UserMessageCol" verticalAlign = 'middle' >
              <Label className = "UserMessage" size = 'large' color = 'blue' pointing = 'right'>
                {data.message}
              </Label>
            </Grid.Column>
          </Grid.Row>
        );
      } else if (data.by === 'bot'){
        return (
          <Grid.Row className = "MessageContainer">
            <Grid.Column className = "BotAvatarCol" width = {2} verticalAlign = 'middle'>
              <Image inline = {true} verticalAlign = 'middle' src = {RobotPNG} size = 'mini' circular = {true} bordered = {true}/>
            </Grid.Column>
            <Grid.Column className = "BotMessageCol" width = {14} verticalAlign = 'middle'>
              <Label as = 'span' className = "BotMessage" size = 'large' pointing = 'left'>
                {data.message}
              </Label>
            </Grid.Column>
          </Grid.Row>
        );
      }
    });

    return(
      <Grid className = 'MessageList'>
        {messages}
      </Grid>
    );
  }
}

export default MessageList;
