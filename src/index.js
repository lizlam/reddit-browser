import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Posts from './Posts';
import Subreddit from './Subreddit';
import Details from './Details';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px;
`;

const Column = styled.div`
  float: left;
  width: 30%;
`;

const Message = styled.div`
  font-family: Arial;
  padding-left: 50%;
`;

const Header = styled.h2`
  font-family: Arial;
  padding-left: 50%;
`
class Subreddits extends React.Component {
  
  constructor(props) {
    super(props);
	  this.state = { 
      subreddits: [], 
      clicked: false, 
      selectedSub: 'AskReddit', 
      selectedPost: null}
	}

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
  
  onSelectSub = (s) => {
    this.setState({ selectedSub: s });
  }

  onSelectPost = (p) => {
    console.log(p.author);
    this.setState({ selectedPost: p});
  }

  renderDetails(p) {
    if (p === null) {
      // if null do nothing
      return 
    } 
    return <Details title={p.title} author={p.author} text={p.text} />
  }

  renderPosts(selected) {
    if (selected === null) {
      // if null do nothing
      return
    }
    return <Posts onSelectPost={this.onSelectPost} subreddit={selected} />  
  }

  render() {
    const { subreddits, clicked, selectedSub, selectedPost } = this.state;
    console.log(selectedSub);
    return (
      <Container>
        <Column>
          <Header>Subreddits</Header>
          {subreddits.map(s => { 
            return (
          	  <div>
           	    <Subreddit 
                  onSelectSub={this.onSelectSub}
                  onSelectPost={this.onSelectPost}
           	      subreddit={s.display_name}
                  active={selectedSub === s.display_name ? true : false} 
           	      description={s.description} /> 
           	  </div>
            )
          })} 
        </Column>
        <Column>
          <Header>Posts</Header>
          {this.renderPosts(selectedSub)}
        </Column>
        <Column>
          <Header>Details</Header>
          {selectedPost === null 
            ? <Message>Select a post to see details here.</Message> 
            : this.renderDetails(selectedPost)}
        </Column>
      </Container>
    );
  }
}

// ========================================

ReactDOM.render(
    <Subreddits />,
  document.getElementById('root')
);
