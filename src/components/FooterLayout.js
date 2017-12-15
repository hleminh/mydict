import React, {Component} from 'react';
import banner from '../assets/images/banner.gif'

import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Segment
} from 'semantic-ui-react';

class FooterLayout extends Component {
  render() {
    return (
      <div className="FooterLayout">
      <Segment color='blue' inverted="inverted" vertical="vertical" style={{
          margin: '5em 0em 0em',
          padding: '5em 0em',
        }}>
        <Container textAlign='center'>
          <Grid divided="divided" inverted="inverted" stackable="stackable">
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted="inverted" as='h4' content='Group 1'/>
                <List link="link" inverted="inverted">
                  <List.Item as='a'>Link One</List.Item>
                  <List.Item as='a'>Link Two</List.Item>
                  <List.Item as='a'>Link Three</List.Item>
                  <List.Item as='a'>Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted="inverted" as='h4' content='Group 2'/>
                <List link="link" inverted="inverted">
                  <List.Item as='a'>Link One</List.Item>
                  <List.Item as='a'>Link Two</List.Item>
                  <List.Item as='a'>Link Three</List.Item>
                  <List.Item as='a'>Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted="inverted" as='h4' content='Group 3'/>
                <List link="link" inverted="inverted">
                  <List.Item as='a'>Link One</List.Item>
                  <List.Item as='a'>Link Two</List.Item>
                  <List.Item as='a'>Link Three</List.Item>
                  <List.Item as='a'>Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted="inverted" as='h4' content='Footer Header'/>
                <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider inverted="inverted" section="section"/>
          <Image centered="centered" size='mini' src={banner}/>
          <List horizontal="horizontal" inverted="inverted" divided="divided" link="link">
            <List.Item as='a' href='#'>Site Map</List.Item>
            <List.Item as='a' href='#'>Contact Us</List.Item>
            <List.Item as='a' href='#'>Terms and Conditions</List.Item>
            <List.Item as='a' href='#'>Privacy Policy</List.Item>
          </List>
        </Container>
      </Segment>
    </div>);
  }
}

export default FooterLayout;
