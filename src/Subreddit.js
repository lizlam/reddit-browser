import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SubredditEntry = styled.div`
  font-family: Arial;
  color: black;
  margin-left: 25px;
  padding: 10px;
  top-margin: 20px;
  background-color: #fff1f3;
  box-shadow: 1px 1px 1px black;
  border-left: 3px solid black;
  transition: all 0.9s ease-out;
  
  :hover {
    background-color: grey; 
  }
`;

const Header = styled.div`
  font-size: 20px;
  margin-bottom: 1px;
`;

const SelectedHeader = styled.div`
  font-size: 40px;
  margin-bottom: 1px;
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
    active: PropTypes.bool.isRequired,
  };

  render() {
    const { subreddit, description, onSelectSub } = this.props;
    return (
      <div>
        <SubredditEntry onClick={() => onSelectSub(this.props.subreddit)}>
          {this.props.active ? <SelectedHeader>{subreddit}</SelectedHeader> : <Header>{subreddit}</Header>}  
          <Description>{description}</Description>
        </SubredditEntry>
        
      </div>
    );
  }
}
