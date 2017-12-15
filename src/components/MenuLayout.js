import React, {Component} from 'react';
import banner from '../assets/images/banner.gif';
import {Link} from 'react-router-dom';

import {
  Container,
  Image,
  Menu,
  Modal,
  Button,
  Form,
  Tab
} from 'semantic-ui-react';

class MenuLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      origin: '',
      kana: '',
      definition: '',
      tab: '0',
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
      origin: this.state.origin,
      kana: this.state.kana,
      definition: JSON.parse(this.state.definition),
    }
    var category = (this.state.tab === "0") ? 'jpn-vie' : 'vie-jpn';
    this.props.handleNewSubmit(newData, category, (success, oldData) => {
      if (success){
        this.setState({
          origin: '',
          kana: '',
          definition: '',
          tab: '0',
        });
      } else{
        this.setState({
          origin: oldData.origin,
          kana: oldData.kana,
          definition: oldData.definition
        });
        this.setState({modalOpen: true});
      }
    });
  }

  handleModalOpen(e){
    e.preventDefault();
    this.setState({modalOpen: true});
  }

  handleOriginChange(e){
    console.log(e.target.value);
    this.setState({origin: e.target.value})
  }

  handleKanaChange(e){
    console.log(e.target.value);
    this.setState({kana: e.target.value})
  }

  handleDefinitionChange(e){
    console.log(e.target.value);
    this.setState({definition: e.target.value})
  }

  handleTabChange(e, data){
    console.log(data.activeIndex);
    this.setState({tab: data.activeIndex});
  }

  render() {

    const panes = [
      { menuItem: 'Nhật - Việt', render: () =>
        <Tab.Pane attached={false}>
          <Form.Field>
            <label>Origin</label>
            <input required ref="origin" placeholder='Nhập chữ' defaultValue={this.state.origin} onChange={this.handleOriginChange.bind(this)}/>
          </Form.Field>
          <Form.Field>
            <label>Kana</label>
            <input required ref="kana" placeholder='Nhập kana' defaultValue={this.state.kana} onChange={this.handleKanaChange.bind(this)}/>
          </Form.Field>
          <Form.Field>
            <label>Definition</label>
            <input required ref="definition" placeholder='Nhập nghĩa' defaultValue={JSON.stringify(this.state.definition)} onChange={this.handleDefinitionChange.bind(this)}/>
          </Form.Field>
        </Tab.Pane>},
      { menuItem: 'Việt - Nhật', render: () =>
        <Tab.Pane attached={false}>
          <Form.Field>
            <label>Origin</label>
            <input required ref="origin" placeholder='Nhập chữ' defaultValue={this.state.origin} onChange={this.handleOriginChange.bind(this)}/>
          </Form.Field>
          <Form.Field>
            <label>Kana</label>
            <input required ref="kana" placeholder='Nhập chữ không dấu' defaultValue={this.state.kana} onChange={this.handleKanaChange.bind(this)}/>
          </Form.Field>
          <Form.Field>
            <label>Definition</label>
            <input required ref="definition" placeholder='Nhập nghĩa' defaultValue={JSON.stringify(this.state.definition)} onChange={this.handleDefinitionChange.bind(this)}/>
          </Form.Field>
        </Tab.Pane> },
    ]

    return (<div className="MenuLayout">
      <Menu fixed='top' inverted={true} color='blue' stackable>
        <Container fluid>
          <Menu.Item as='' header={true}>
            <Image size='mini' src={banner} style={{
                marginRight: '1.5em'
              }}/>
              SUCC myDict
          </Menu.Item>
          <Menu.Item as={Link} to='/search' name='search'>
            Tra từ
          </Menu.Item>
          <Menu.Item as={Link} to='/about' name='about'>
            About
          </Menu.Item>
          <Menu.Menu position = 'right'>
            <Modal size = 'tiny' trigger={
              <Menu.Item as='a' name='sign_up' onClick = {this.handleModalOpen.bind(this)}>
                Tạo bản ghi mới
              </Menu.Item>}
              open={this.state.modalOpen}
              >
                <Modal.Header>Tạo bản ghi mới</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Tab defaultActiveIndex = {this.state.tab} menu={{ secondary: true, pointing: true }} panes={panes} onTabChange = {this.handleTabChange.bind(this)} />
                    <br />
                    <Button.Group fluid>
                      <Button type='submit' onClick = {this.handleNewCancelButton.bind(this)}>Cancel</Button>
                      <Button.Or />
                      <Button type='submit' color = 'blue' onClick = {this.handleNewSubmitButton.bind(this)}>Submit</Button>
                    </Button.Group>
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
