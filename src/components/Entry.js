import React, {Component} from 'react';
import Definition from './Definition';
import { Card, Icon, Button, Form, Modal} from 'semantic-ui-react';

class Entry extends Component {
  constructor(props){
    super(props);
    this.state = {
      editFormOpen: false,
      modalOpen: false,
    }
  }

  componentWillMount(){
    if (this.props.userAccount){
      var savedEntriesId = [];
      // console.log(this.props.userAccount.user.entries);
      for (var element in this.props.userAccount.user.entries){
        // console.log(this.props.userAccount.user.entries[element]);
        savedEntriesId.push(this.props.userAccount.user.entries[element].item);
      }
      // console.log('mount savedEntriesId', savedEntriesId);
      if (savedEntriesId.includes(this.props.data._id)){
        this.setState({
          saved: true,
        });
      }else{
        this.setState({
          saved: false,
        });
      }
    }
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps);
    if (nextProps.userAccount){
      var savedEntriesId = [];
      // console.log(nextProps.userAccount.user.entries);
      for (var element in nextProps.userAccount.user.entries){
        // console.log(nextProps.userAccount.user.entries[element]);
        savedEntriesId.push(nextProps.userAccount.user.entries[element].item);
      }
      // console.log('nextprops savedEntriesId', savedEntriesId);
      if (savedEntriesId.includes(this.props.data._id)){
        this.setState({
          saved: true,
        });
      }else{
        this.setState({
          saved: false,
        });
      }
    }
  }

  handleTTS(e) {
    window.speechSynthesis.cancel();
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10];
    msg.voiceURI = 'native';
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 0;
    msg.text = this.props.data.kana;
    msg.lang = 'ja';
    window.speechSynthesis.speak(msg);
  };

  handleEditButton(e){
    e.preventDefault();
    this.setState({
      editFormOpen: true,
    });
  }

  handleEditCancelButton(e){
    e.preventDefault();
    this.setState({
      editFormOpen: false,
    });
  }

  handleModalOpen(e){
    e.preventDefault();
    this.setState({
      modalOpen: true,
    })
  }

  handleEditSubmitButton(e){
    e.preventDefault();
    this.setState({
      editFormOpen: false,
    });
    var editData = {
      _id: this.props.data._id,
      id: this.props.data.id,
      origin: this.refs.origin.value,
      kana: this.refs.kana.value,
      definition: JSON.parse(this.refs.definition.value),
    }
    this.props.handleEditSubmitButton(editData, (success)=>{
      if (!success){
        this.setState({
          editFormOpen: true,
        });
      }
    });
  }

  handleDeleteSubmitButton(e){
    e.preventDefault();
    this.setState({
      modalOpen: false,
    });
    this.props.handleDeleteSubmit(this.props.data._id, (success, oldData) => {

    });
  }

  handleDeleteCancelButton(e){
    e.preventDefault();
    this.setState({
      modalOpen: false,
    });
  }

  handleSaveButton(e){
    e.preventDefault();
    this.setState({
      saved: true,
    });
    this.props.handleSaveSubmit(this.props.data, (success, err) => {
      if (!success){
        // console.log('save failed');
        // console.log(err);
        this.setState({
          saved: false,
        });
      }
    });
  }

  handleUnSaveButton(e){
    e.preventDefault();
    this.setState({
      saved: false,
    });
    this.props.handleUnSaveSubmit(this.props.data, (success, err) => {
      if (!success){
        // console.log('unsave failed');
        // console.log(err);
        this.setState({
          saved: true,
        });
      }
    });
  }

  render() {
    if(!this.state.editFormOpen) {
      return (
        <div className="Entry">
        <Card fluid centered>
          <Card.Content>
            <Card.Header>
              {this.props.data.origin}
                <Button circular={true} floated='right' active={false} icon={
                  <Icon className=' volume up icon'>
                  </Icon>
                }
                onClick={this.handleTTS.bind(this)}
                >
                </Button>
                {this.props.userAccount && !this.state.saved &&
                  <Button circular={true} floated='right' active={false} icon={
                    <Icon className='empty star icon'>
                    </Icon>
                  }
                  onClick={this.handleSaveButton.bind(this)}
                  >
                  </Button>
                }

                {this.props.userAccount && this.state.saved &&
                  <Button circular={true} floated='right' active={false} icon={
                    <Icon className='star icon'>
                    </Icon>
                  }
                  onClick={this.handleUnSaveButton.bind(this)}
                  >
                  </Button>
                }

                {this.props.userAccount && this.props.userAccount.user.admin &&
                  <Button circular={true} floated='right' active={false} icon={
                    <Icon className='edit icon'>
                    </Icon>
                  }
                  onClick={this.handleEditButton.bind(this)}
                  >
                  </Button>
                }
                {this.props.userAccount && this.props.userAccount.user.admin &&
                  <Modal size = 'tiny' trigger = {
                    <Button circular={true} floated='right' active={false} icon={
                      <Icon className='trash icon'>
                      </Icon>
                    }
                    onClick = {this.handleModalOpen.bind(this)}
                    >
                    </Button>
                  }
                    open={this.state.modalOpen}
                    >
                      <Modal.Header>Xác nhận xóa?</Modal.Header>
                      <Modal.Content>
                        <Button.Group fluid>
                          <Button type='submit' onClick = {this.handleDeleteCancelButton.bind(this)}>Cancel</Button>
                          <Button.Or />
                          <Button type='submit' color='red' onClick = {this.handleDeleteSubmitButton.bind(this)}>Xóa</Button>
                        </Button.Group>
                      </Modal.Content>
                  </Modal>
                }
            </Card.Header>
            <Card.Meta>
              {this.props.data.kana}
            </Card.Meta>
            <Card.Description>
              <Definition definition = {this.props.data.definition} />
            </Card.Description>
          </Card.Content>
        </Card>
      </div>);
    }else{
      return(
        <Card fluid centered>
          <Card.Content>
            <Form onSubmit={this.handleEditSubmitButton.bind(this)}>
              <Form.Field required>
                <label>Origin</label>
                <input ref="origin" placeholder='Enter origin' defaultValue={this.props.data.origin}/>
              </Form.Field>
              <Form.Field required>
                <label>Kana</label>
                <input ref="kana" placeholder='Enter kana' defaultValue={this.props.data.kana}/>
              </Form.Field>
              <Form.Field required>
                <label>Definition</label>
                <input ref="definition" placeholder='Enter definition' defaultValue={JSON.stringify(this.props.data.definition)}/>
              </Form.Field>
              <Button.Group fluid>
                <Button type='submit' onClick = {this.handleEditCancelButton.bind(this)}>Cancel</Button>
                <Button.Or />
                <Button type='submit' color = 'blue'>Submit</Button>
              </Button.Group>
          </Form>
        </Card.Content>
      </Card>);
    }
  }
}

export default Entry;
