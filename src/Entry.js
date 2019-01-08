import React from 'react';
import styled from 'styled-components'

const Post = styled.div`
  color: black;
  font-family: Arial;
  font-size: 12px;
  padding: 10px;
  margin-left: 25px;
  text-align: center;
  font-size: 20px;
  box-shadow: 1px 1px 1px black;
  background-color: #d0f0d0;
  width: 900px;
    :hover {
      background-color: grey;
    };
`;

const Details = styled.div`
  font-family: Arial;
  padding: 10px;
  font-size: 14px;
  margin-left: 37px;
  color: grey;
  border-left: 3px solid green;
  width: 900px;
`;

export default class Entry extends React.Component {
	props = {
    title: null,
    author: null,
    text: null,
	}

	state = { details: false}

	handleClick = () => {
		console.log(this.state.details)
    if (this.state.details === false) {
      this.setState({ details: true });
    } else {
    	this.setState({ details: false });
    }
	}

	render() {
		const { title, author, text } = this.props;
 		const { details } = this.state;
    return (
      <div>
 		    <Post onClick={this.handleClick}>{title}</Post>
        {details && <Details>Posted by: {author} <br /> {text ? text : "There is no text."}</Details>}
 		  </div>
		);
	} 
}