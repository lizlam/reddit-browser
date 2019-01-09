import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Posts from './Posts';
import styled from 'styled-components';

const SubredditEntry = styled.div`
  font-family: Arial;
  color: black;
  margin-left: 25px;
  padding: 10px;
  top-margin: 20px;
  background-color: #ff6c1;
  border-left: 3px solid black;
`;

const Header = styled.div`
  font-size: 20px;
  margin-bottom: 1px;
  :hover {
    color: green; 
  }
`;

const Description = styled.p`
  font-size: 14px;
  margin-top: 0px;  
`;

export default class Subreddit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false }    
  }

  static propTypes = { 
    subreddit: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired, 
    onSelectSub: PropTypes.func.isRequired,
    selectedSub: PropTypes.string,
    active: PropTypes.bool.isRequired,
  };


	
  handleClick = () => {
    if (this.props.selectedSub === this.props.subreddit) {

    }
  }

  render() {
    const { subreddit, selectedSub, description, onSelectSub } = this.props;
    const { clicked } = this.state;
    return (
      <div>
        <SubredditEntry>
          <Header onClick={() => onSelectSub(this.props.subreddit) && this.handleClick}>
            {subreddit} {this.props.active ? '<' : ''}  
          </Header>
          <Description>{description}</Description>
        </SubredditEntry>
        
      </div>
    );
  }
}
