import './App.css';
import React, { useState, useEffect } from 'react';
import CommentForm from './components/CommentForm/CommentForm';
import CommentList from './components/CommentList/CommentList';

const App = () => {
  const [comments, setComments] = useState([]);
  const [isDescending, setIsDescending] = useState(true);

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

  const handleSortToggle = () => {
    setIsDescending(!isDescending);
  };

  // Function to sort comments based on date
  const sortedComments = [...comments].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return isDescending ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="App">
      <CommentForm onSubmit={addComment} />
      <div className="sort-by">
        <span onClick={handleSortToggle}>Sort By: Date and Time</span>
        <button onClick={handleSortToggle} className="sort-button">
          {isDescending ? (
            <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
          ) : (
            <i className="fa-solid fa-arrow-up" aria-hidden="true"></i>
          )}
        </button>
      </div>
      <CommentList
        comments={sortedComments}
        onDelete={deleteItem}
        onEdit={editItem}
        onReply={addReply}
      />
    </div>
  );
};

export default App;
