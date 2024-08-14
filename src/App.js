import './App.css';
import React, { useState, useEffect } from 'react';
import CommentForm from './components/CommentForm/CommentForm';
import CommentList from './components/CommentList/CommentList';

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(storedComments);
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const addComment = (comment) => {
    setComments(prevComments => [...prevComments, { ...comment, id: Date.now(), replies: [] }]);
  };
  
  const addReply = (commentId, reply) => {
    setComments(prevComments => prevComments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, { ...reply, id: Date.now() }] }
        : comment
    ));
  };

  const editItem = (id, newText) => {
    setComments(prevComments =>
      prevComments.map(comment => ({
        ...comment,
        comment: comment.id === id ? newText : comment.comment,
        replies: comment.replies.map(reply =>
          reply.id === id ? { ...reply, comment: newText } : reply
        )
      }))
    );
  };

  const deleteItem = (id) => {
    setComments(prevComments =>
      prevComments
        .filter(comment => comment.id !== id)
        .map(comment => ({
          ...comment,
          replies: comment.replies.filter(reply => reply.id !== id)
        }))
    );
  };

  return (
    <div className="App">
      <CommentForm onSubmit={addComment} />
      <CommentList
        comments={comments}
        onDelete={deleteItem}
        onEdit={editItem}
        onReply={addReply}
      />
    </div>
  );
};

export default App;
