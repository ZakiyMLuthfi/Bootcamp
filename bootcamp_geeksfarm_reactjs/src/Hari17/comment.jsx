import React from "react";

const Comment = ({ name, date, comment, avatar }) => {
  return (
    <div className="comment">
      <a className="avatar">
        <img src={avatar} alt={name} />
      </a>
      <div className="content">
        <a className="author">{name}</a>
        <div className="metadata">
          <span className="date">{date}</span>
        </div>
        <div className="text">{comment}</div>
      </div>
    </div>
  );
};

export default Comment;
