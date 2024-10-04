import React, { Component } from "react";
import { faker } from "@faker-js/faker";
import Comment from "./comment";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    const comments = [];
    for (let i = 0; i < 10; i++) {
      comments.push({
        name: faker.name.fullName(),
        date: faker.date.recent().toLocaleTimeString(),
        comment: faker.lorem.sentence(),
        avatar: faker.image.avatar(),
      });
    }
    this.setState({ comments });
  }

  render() {
    return (
      <div className="ui comments">
        <h3 className="ui dividing header">Komentar</h3>
        {this.state.comments.map((user, index) => (
          <Comment
            key={index}
            name={user.name}
            date={user.date}
            comment={user.comment}
            avatar={user.avatar}
          />
        ))}
      </div>
    );
  }
}

export default CommentList;
