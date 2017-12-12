import React, {Component} from 'react';
import banner from '../assets/banner.gif';

import {
  Container,
  Image,
  Menu,
  Modal,
  Button,
  Form
} from 'semantic-ui-react';

class MenuLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      origin: '',
      kana: '',
      definition: '',
    }
  }

  handleNewCancelButton(e){
    e.preventDefault();
    this.setState({modalOpen: false})
  }

  handleNewSubmitButton(e){
    e.preventDefault();
    this.setState({
      modalOpen: false,
    });
    var newData = {
      origin: this.refs.origin.value,
      kana: this.refs.kana.value,
      definition: JSON.parse(this.refs.definition.value),
    }
    this.props.handleNewSubmit(newData, (success, oldData) => {
      if (success){
        this.setState({
          origin: '',
          kana: '',
          definition: '',
        });
      } else{
        this.setState({
          origin: oldData.origin,
          kana: oldData.kana,
          definition: oldData.definition,
        });
        this.setState({modalOpen: true});
      }
    });
  }

  handleModalOpen(e){
    e.preventDefault();
    this.setState({modalOpen: true});
  }

  render() {
    return (<div className="MenuLayout">
      <Menu fixed='top' inverted={true} color='blue' stackable>
        <Container fluid>
          <Menu.Item as='' header={true}>
            <Image size='mini' src={banner} style={{
                marginRight: '1.5em'
              }}/>
              SUCC myDict
          </Menu.Item>
          <Menu.Item as='a' name='home'>
            Home
          </Menu.Item>
          <Menu.Item as='a' name='about'>
            About
          </Menu.Item>
          <Menu.Menu position = 'right'>
            <Modal dimmer='default' size = 'tiny' trigger={
              <Menu.Item as='a' name='sign_up' onClick = {this.handleModalOpen.bind(this)}>
                Tạo bản ghi mới
              </Menu.Item>}
              open={this.state.modalOpen}
              >
                <Modal.Header>Tạo bản ghi mới</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Field>
                      <label>Origin</label>
                      <input ref="origin" placeholder='Enter origin' defaultValue={this.state.origin}/>
                    </Form.Field>
                    <Form.Field>
                      <label>Kana</label>
                      <input ref="kana" placeholder='Enter kana' defaultValue={this.state.kana}/>
                    </Form.Field>
                    <Form.Field>
                      <label>Definition</label>
                      <input ref="definition" placeholder='Enter definition' defaultValue={JSON.stringify(this.state.definition)}/>
                    </Form.Field>
                    <Button type='submit' color = 'blue' floated = 'right' onClick = {this.handleNewSubmitButton.bind(this)}>Submit</Button>
                    <Button type='submit' onClick = {this.handleNewCancelButton.bind(this)}>Cancel</Button>
                </Form>
                </Modal.Content>
            </Modal>
            <Menu.Item as='a' name='sign_in'>
              Đăng nhập
            </Menu.Item>
            <Menu.Item as='a' name='sign_up'>
              Đăng ký
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>);
  }
}

export default MenuLayout;
