import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Posts from './Posts';
import styled from 'styled-components';

const SubredditEntry = styled.div`
  font-family: Arial;
  color: black;
  margin-left: 25px;
  padding: 10px;
  top-margin: 20px;
  border-left: 3px solid black;
  width: 900px;
  :hover {
    color: green; 
  }
`;

const Header = styled.h2`
  margin-bottom: 1px;
`;

const Description = styled.p`
  margin-top: 0px;  
`;
export default class Subreddit extends React.Component {
  props = { subreddit: null,
            description: null }
	state = { clicked: false }  

  handleClick = () => {
    if (this.state.clicked === false) {
    	this.setState({ clicked: true });	
    }	else {
    	this.setState({ clicked: false })
    }
  }

  render() {
    const { subreddit, description } = this.props;
    const { clicked } = this.state;
    return (
      <div>
        <SubredditEntry onClick={this.handleClick}>
          <Header>{subreddit}</Header>
          <Description>{description}</Description>
        </SubredditEntry>
        {clicked && <Posts subreddit={subreddit} />}
      </div>
    );
  }
}
