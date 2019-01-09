import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Entry from './Entry';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] }
  }
  static propTypes = {
    subreddit: PropTypes.string.isRequired,
    onSelectPost: PropTypes.func.isRequired,
    hot: PropTypes.bool.isRequired,
  }

  fetchPosts = () => {
    const sort = this.props.hot ? 'hot' : 'new';
    const url = `https://www.reddit.com/r/${this.props.subreddit}/${sort}.json`;
      axios({
        url: url,
        method: 'get',
      }).then(response => {
        const listing = response.data.data.children.map(list => {
          return Object({ title: list.data.title,
            author: list.data.author,
            text: list.data.selftext,
            url: list.data.url,
            name: list.data.name})
        });
        this.setState({ posts: listing });
      });
  }

  componentDidMount() {
    this.fetchPosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subreddit !== this.props.subreddit || prevProps.hot !== this.props.hot) {
      this.fetchPosts();
    }
  }

  render() {
    const { posts } = this.state;
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
