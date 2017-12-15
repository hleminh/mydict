import React, {Component} from 'react';
import {Container, Image, Header} from 'semantic-ui-react';
import MediaParagraphPNG from '../assets/images/media-paragraph.png';
import ParagraphPNG from '../assets/images/paragraph.png';
import FooterLayout from './FooterLayout';

class AboutPage extends Component{
  render(){
    return(
      <div className="">
        <Container text style={{ marginTop: '100px'}}>
          <Header as='h1'>About Me</Header>

          <p>Lorem ipsum.</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent neque libero, malesuada vitae pellentesque vitae, aliquet ut nulla. Duis vestibulum nisi id tortor sodales, eget pharetra ex finibus. Praesent molestie neque vel nunc maximus, nec euismod nulla accumsan. Aenean sagittis bibendum dolor vel commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nibh arcu, maximus non euismod commodo, rhoncus et orci. Sed faucibus mattis tortor, non suscipit arcu suscipit id. Donec ex ex, lacinia nec ultrices nec, viverra a mauris. Morbi felis justo, feugiat et venenatis sit amet, auctor eu magna. Nunc auctor quam id leo sagittis, in commodo elit scelerisque. Mauris non purus pretium, finibus risus a, commodo nulla.</p>

          <Image src={MediaParagraphPNG} style={{ marginTop: '2em' }} />
          <Image src={ParagraphPNG} style={{ marginTop: '2em' }} />
          <Image src={ParagraphPNG} style={{ marginTop: '2em' }} />
          <Image src={ParagraphPNG} style={{ marginTop: '2em' }} />
          <Image src={ParagraphPNG} style={{ marginTop: '2em' }} />
          <Image src={ParagraphPNG} style={{ marginTop: '2em' }} />
          <Image src={ParagraphPNG} style={{ marginTop: '2em' }} />
        </Container>
        <FooterLayout />
      </div>
    );
  }
}

export default AboutPage;
