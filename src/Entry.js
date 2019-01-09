import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Post = styled.div`
  color: black;
  font-family: Arial;
  font-size: 12px;
  padding: 10px;
  margin-left: 25px;
  text-align: left;
  font-size: 20px;
  box-shadow: 1px 1px 1px black;
  background-color: #d0f0d0;
  :hover {
    background-color: grey;
  };
`;

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { details: false }    
  }

	static propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string,
    onSelectPost: PropTypes.func.isRequired,
    clicked: PropTypes.bool,
	};

  handleClick = () => {
    if (this.state.details === false) {
      this.setState({ details: true });
    } else {
      this.setState({ details: false });
    }
  }

	render() {
		const { title, clicked } = this.props;
    return (
      <div onClick={() => this.props.onSelectPost(this.props)} >
 		    <Post onClick={this.handleClick}> {title}</Post>
          { clicked ? <hr /> : ''}
 		  </div>
		);
	} 
}