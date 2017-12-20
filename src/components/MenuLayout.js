import React, {Component} from 'react';
import banner from '../assets/images/menu.png';
import {Link} from 'react-router-dom';

import {
  Container,
  Image,
  Menu,
  Modal,
  Button,
  Form,
  Tab,
  Message,
  Dropdown
} from 'semantic-ui-react';

class MenuLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      signUpPassword: '',
      signUpUsername: '',
      signInPassword: '',
      SignInUsername: '',
      newModalOpen: false,
      signUpModalOpen: false,
      signInModalOpen: false,
      origin: '',
      kana: '',
      definition: '',
      tab: '0',
    }
  }

  handleNewCancelButton(e){
    e.preventDefault();
    this.setState({newModalOpen: false})
  }

  handleSignUpCancelButton(e){
    e.preventDefault();
    this.setState({signUpModalOpen: false})
  }

  handleSignInCancelButton(e){
    e.preventDefault();
    this.setState({signInModalOpen: false})
  }

  handleNewSubmitButton(e){
    e.preventDefault();
    this.setState({
      newModalOpen: false,
    });
    var newData = {
      origin: this.state.origin,
      kana: this.state.kana,
      definition: JSON.parse(this.state.definition),
    }
    var category = (this.state.tab === "0") ? 'jpn_vie' : 'vie_jpn';
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
        this.setState({newModalOpen: true});
      }
    });
  }

  handleSignUpSubmitButton(e){
    e.preventDefault();
    this.setState({
      signUpModalOpen: false,
    });
    var newData = {
      username: this.refs.signUpUsername.value,
      password: this.refs.signUpPassword.value,
    }
    this.props.handleSignUpSubmit(newData, (success, oldData) => {
      if (success){
        this.setState({
          signUpPassword: '',
          signUpUsername: '',
        });
      } else{
        this.setState({
          signUpPassword: oldData.password,
          signUpUsername: oldData.username,
        });
        this.setState({signUpModalOpen: true});
      }
    });
  }

  handleSignInSubmitButton(e){
    e.preventDefault();
    this.setState({
      signInModalOpen: false,
    });
    var newData = {
      username: this.refs.signInUsername.value,
      password: this.refs.signInPassword.value,
    }
    this.props.handleSignInSubmit(newData, (success, oldData) => {
      if (success){
        this.setState({
          signInPassword: '',
          signInUsername: '',
        });
      } else{
        this.setState({
          signInPassword: oldData.password,
          signInUsername: oldData.username,
        });
        this.setState({signInModalOpen: true});
      }
    });
  }

  handleNewModalOpen(e){
    e.preventDefault();
    this.setState({newModalOpen: true});
  }

  handleSignUpModalOpen(e){
    e.preventDefault();
    this.setState({signUpModalOpen: true});
  }

  handleSignInModalOpen(e){
    e.preventDefault();
    this.setState({signInModalOpen: true});
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
          <Form.Field required>
            <label>Origin</label>
            <input required ref="origin" placeholder='Nhập chữ' defaultValue={this.state.origin} onChange={this.handleOriginChange.bind(this)}/>
          </Form.Field>
          <Form.Field required>
            <label>Kana</label>
            <input required ref="kana" placeholder='Nhập kana' defaultValue={this.state.kana} onChange={this.handleKanaChange.bind(this)}/>
          </Form.Field>
          <Form.Field required>
            <label>Definition</label>
            <input required ref="definition" placeholder='Nhập nghĩa' defaultValue={JSON.stringify(this.state.definition)} onChange={this.handleDefinitionChange.bind(this)}/>
          </Form.Field>
        </Tab.Pane>},
      { menuItem: 'Việt - Nhật', render: () =>
        <Tab.Pane attached={false}>
          <Form.Field required>
            <label>Origin</label>
            <input required ref="origin" placeholder='Nhập chữ' defaultValue={this.state.origin} onChange={this.handleOriginChange.bind(this)}/>
          </Form.Field>
          <Form.Field required>
            <label>Kana</label>
            <input required ref="kana" placeholder='Nhập chữ không dấu' defaultValue={this.state.kana} onChange={this.handleKanaChange.bind(this)}/>
          </Form.Field>
          <Form.Field required>
            <label>Definition</label>
            <input required ref="definition" placeholder='Nhập nghĩa' defaultValue={JSON.stringify(this.state.definition)} onChange={this.handleDefinitionChange.bind(this)}/>
          </Form.Field>
        </Tab.Pane> },
    ]

    return (<div className="MenuLayout">
      <Menu fixed='top' inverted={true} color='blue' stackable>
        <Container fluid>
          <Menu.Item as='' header={true} fitted='vertically' style={{
            paddingLeft: '16px',
          }}>
            <Image size='mini' src={banner} style={{
                marginRight: '1em',
              }}/>
              SUGE myDict
          </Menu.Item>
          <Menu.Item as={Link} to='/search' name='search'>
            Tra từ
          </Menu.Item>
          <Menu.Item as={Link} to='/about' name='about'>
            About
          </Menu.Item>
          {this.props.userAccount &&
            <Menu.Item as={Link} to='/saved' name='saved'>
              Từ đã lưu
            </Menu.Item>
          }
          <Menu.Menu position = 'right'>
            {this.props.userAccount && this.props.userAccount.user.admin &&
            <Modal size = 'tiny' trigger={
              <Menu.Item as='a' name='sign_up' onClick = {this.handleNewModalOpen.bind(this)}>
                Tạo bản ghi mới
              </Menu.Item>}
              open={this.state.newModalOpen}
              >
                <Modal.Header>Tạo bản ghi mới</Modal.Header>
                <Modal.Content>
                  <Form onSubmit={this.handleNewSubmitButton.bind(this)}>
                    <Message
                      error
                      header='Không thể tạo bản ghi'
                      content='Đã xảy ra lỗi khi gửi yêu cầu đến server. Xin hãy thử lại.'
                    />
                    <Tab defaultActiveIndex = {this.state.tab} menu={{ secondary: true, pointing: true }} panes={panes} onTabChange = {this.handleTabChange.bind(this)} />
                    <br />
                    <Button.Group fluid>
                      <Button type='submit' onClick = {this.handleNewCancelButton.bind(this)}>Cancel</Button>
                      <Button.Or />
                      <Button type='submit' color = 'blue'>Submit</Button>
                    </Button.Group>
                </Form>
                </Modal.Content>
            </Modal>
            }
            {!this.props.userAccount &&
            <Modal trigger ={
              <Menu.Item as='a' name='sign_in' onClick = {this.handleSignInModalOpen.bind(this)}>
                Đăng nhập
              </Menu.Item>}
              size = 'tiny'
              open={this.state.signInModalOpen}>
              <Modal.Header>Đăng nhập</Modal.Header>
              <Modal.Content>
                <Form onSubmit={this.handleSignInSubmitButton.bind(this)}>
                  <Message
                    error
                    header='Không thể đăng nhập'
                    content='Đã xảy ra lỗi khi gửi gửi yêu cầu đến server. Xin hãy thử lại.'
                  />
                  <Form.Field required>
                    <label>Username</label>
                    <input required ref="signInUsername" placeholder='Nhập username'/>
                  </Form.Field>
                  <Form.Field required>
                    <label>Password</label>
                    <input required ref="signInPassword" type="password" placeholder='Nhập password'/>
                  </Form.Field>
                  <Button.Group fluid>
                    <Button type='submit' onClick = {this.handleSignInCancelButton.bind(this)}>Cancel</Button>
                    <Button.Or />
                    <Button type='submit' color = 'blue'>Submit</Button>
                  </Button.Group>
              </Form>
              </Modal.Content>
            </Modal>
            }
            {!this.props.userAccount &&
            <Modal trigger ={
              <Menu.Item as='a' name='sign_up' onClick = {this.handleSignUpModalOpen.bind(this)}>
                Đăng ký
              </Menu.Item>}
              size = 'tiny'
              open={this.state.signUpModalOpen}>
              <Modal.Header>Tạo tài khoản mới</Modal.Header>
              <Modal.Content>
                <Form onSubmit={this.handleSignUpSubmitButton.bind(this)}>
                  <Message
                    error
                    header='Không thể tạo tài khoản'
                    content='Đã xảy ra lỗi khi gửi gửi yêu cầu đến server. Xin hãy thử lại.'
                  />
                  <Form.Field required>
                    <label>Username</label>
                    <input required ref="signUpUsername" defaultValue={this.state.signUpUsername} placeholder='Nhập username'/>
                  </Form.Field>
                  <Form.Field required>
                    <label>Password</label>
                    <input required ref="signUpPassword" defaultValue={this.state.signUpPassword} type="password" placeholder='Nhập password'/>
                  </Form.Field>
                  <Button.Group fluid>
                    <Button type='submit' onClick = {this.handleSignUpCancelButton.bind(this)}>Cancel</Button>
                    <Button.Or />
                    <Button type='submit' color = 'blue'>Submit</Button>
                  </Button.Group>
              </Form>
              </Modal.Content>
            </Modal>
            }
            {this.props.userAccount &&
                <Dropdown item simple trigger={
                  <span>Xin chào, {this.props.userAccount.user.username}</span>
                }>
                <Dropdown.Menu>
                  <Dropdown.Item as='a' onClick={this.props.handleSignOutSubmit}>Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            }
          </Menu.Menu>
        </Container>
      </Menu>
    </div>);
  }
}

export default MenuLayout;
