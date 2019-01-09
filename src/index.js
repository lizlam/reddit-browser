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
  padding-left: 30%;
`;

const Header = styled.h2`
  font-family: Arial;
  padding-left: 30%;
`

const TopHeader = styled.h1`
  font-family: Arial;
  font-size: 60px;
  padding: 25px;
  height: 75px;
  background-color: #b19cd9;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: 4px solid black;
`

const Input = styled.input`
  font-family: Arial;
  font-size: 60px;
  background-color: #b19cd9;
  border: none;
  box-shadow: 
    inset 0 0 8px  rgba(0,0,0,0.1),
          0 0 16px rgba(0,0,0,0.1); 
  width: 400px;
  text-align: center;
  margin: 20px;
  *:placeholder {
    color: black;
  }
`

const Button = styled.button`
  font-family: Arial;
  font-size: 60px;
  background-color: #b19cd9;
  border: none;
`
const HotSymbol = '🔥'; // Fire 
const NewSymbol = '🌑'; // New Moon

class Subreddits extends React.Component {
  
  constructor(props) {
    super(props);
	  this.state = { 
      subreddits: [], 
      selectedSub: 'AskReddit', 
      selectedPost: null,
      hot: true // sort order: hot vs. new
    }
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
    return <Posts onSelectPost={this.onSelectPost} subreddit={selected} hot={this.state.hot} />  
  }

  handleSort = () => {
    if (this.state.hot === false) {
      this.setState({ hot: true });
    } else {
      this.setState({ hot: false });
    }
  }

  handleOnChange = (e) => {
    this.setState({ selectedSub: e.target.value })
  }

  render() {
    const { subreddits, clicked, selectedSub, selectedPost, hot } = this.state;
    return (
      <Container>
        <TopHeader>
          <Button onClick={this.handleSort}>{this.state.hot ? HotSymbol : NewSymbol}</Button>
          <Input type="text" placeholder={selectedSub} onChange={this.handleOnChange} />
          {selectedPost === null ? 'No selected post.' : selectedPost.title}          
        </TopHeader>
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
          <Header>Posts ({this.state.hot ? `${HotSymbol} Hottest` : `${NewSymbol} Newest`})</Header>
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
