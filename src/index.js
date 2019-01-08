import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Posts from './Posts';
import Subreddit from './Subreddit';
import styled from 'styled-components';

class Subreddits extends React.Component {
	state = { subreddits: [], clicked: false}
	componentDidMount() {
		axios({
      url: 'https://www.reddit.com/subreddits/popular.json',
      method: 'get',
		}).then(response => {
      const listing = response.data.data.children.map(list => {
         return Object({ display_name: list.data.display_name, description: list.data.public_description })
      });
      this.setState({ subreddits: listing });
		});  
	}
  
  render() {
    const { subreddits, clicked } = this.state;
    return (
      <div>
        {subreddits.map(s => { 
          return (
          	<div>
           	  <Subreddit 
           	    onClick={this.handleClick} 
           	    subreddit={s.display_name} 
           	    description={s.description} /> 
           	</div>
          )
        })}      
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
    <Subreddits />,
  document.getElementById('root')
);
