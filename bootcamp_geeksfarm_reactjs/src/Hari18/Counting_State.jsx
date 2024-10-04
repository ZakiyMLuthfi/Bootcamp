import React from "react";

class Counting extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.incrementLikes}>Like</button>
      </div>
    );
  }
}

export default Counting;
