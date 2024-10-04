import React, { Component } from "react";
import Counting from "./Counting_State";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  incrementLikes = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    const { name, date, comment, avatar } = this.props;
    return (
      <div className="comment">
        <a className="avatar">
          <img src={avatar} alt={name} />
        </a>
        <div className="content">
          <a className="author">{name}</a>
          <div className="metadata">
            <span className="date">
              {date} - {this.state.count} likes
            </span>
          </div>
          <div className="text">{comment}</div>
          <Counting
            count={this.state.count}
            incrementLikes={this.incrementLikes}
          />
        </div>
      </div>
    );
  }
}

export default Comment;
