import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components'
import Entry from './Entry';

export default class Posts extends React.Component {
	static propTypes = {
		subreddit: PropTypes.string.isRequired,
		onSelectPost: PropTypes.func.isRequired,
	}
	state = { posts: [], details: false}

	componentDidUpdate() {
		const url = `https://www.reddit.com/r/${this.props.subreddit}/hot.json`;
		axios({
      url: url,
      method: 'get',
		}).then(response => {
      //console.log("post response:", response.data);
      const listing = response.data.data.children.map(list => {
        return Object({ title: list.data.title, 
          	            author: list.data.author, 
          	            text: list.data.selftext,
          	            url: list.data.url })
      });
      this.setState({ posts: listing });
		});  
	}

	handleClick = () => {
		console.log(this.state.details)
    if (this.state.details === false) {
      this.setState({ details: true });
    } else {
    	this.setState({ details: false });
    }
	}

	render() {
		const { posts, details } = this.state;
 		return (
 			<div>
 		    {posts.map(p => {
 		      return(
 		      	<div>
              <Entry title={p.title} onSelectPost={this.props.onSelectPost} author={p.author} text={p.text} />
            </div>
 		      )
 		    })}
 			</div>
		);
	} 
}