import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Info = styled.div`
  font-family: Arial;
  padding: 10px;
  font-size: 14px;
  margin-left: 37px;
  color: grey;
  border-left: 3px solid green;
`;

const Title = styled.h1`
  font-family: Arial;
  padding: 10px;
  float: center;
  background-color: #add8e6; 
  box-shadow: 1px 1px 1px black;
  margin-left: 47px;
`

export default class Details extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string,
  };

  render() {
    const { title, author, text } = this.props;
    return (
      <div>
        <Title>{title}</Title>
        <Info>By: {author} <hr />
          {text} 
        </Info>
      </div>
    );
  } 
}
