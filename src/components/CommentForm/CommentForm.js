import React, { useState } from 'react';
import './CommentForm.css';

const CommentForm = ({ onSubmit, parentId }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && comment) {
      onSubmit({ name, comment, date: new Date() });
      setName('');
      setComment('');
    } else {
      alert('Name and comment are required!');
    }
  };

  return (
    <div className="comment-form-container">
      <h3>{parentId ? 'Reply' : 'Comment'}</h3>
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">{parentId ? 'Reply' : 'Post'}</button>
      </form>
    </div>
  );
};

export default CommentForm;
