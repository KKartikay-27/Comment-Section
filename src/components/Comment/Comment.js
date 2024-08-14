import React, { useState } from 'react';
import './Comment.css';

const Comment = ({ comment, onDelete, onEdit, onReply, isReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.comment);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(comment.id, editedText); // Update the comment text
      setIsEditing(false);
    } else {
      alert('Comment cannot be empty!');
    }
  };

  return (
    <div className={`comment ${isReply ? 'reply' : ''}`}>
      <div className="comment-header">
        <span className="comment-name">{comment.name}</span>
        <span className="comment-date">{new Date(comment.date).toLocaleDateString('en-GB')}</span>
        <button className="delete-button" onClick={() => onDelete(comment.id)}>Delete</button>
      </div>
      <div className="comment-text-container">
        {isEditing ? (
          <div className="comment-editing">
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <p className="comment-text">{editedText}</p>
        )}
      </div>
      {!isEditing && (
        <div className="comment-actions">
          <button className="edit-button" onClick={handleEdit}>Edit</button>
          {!isReply && onReply && (
            <button className="reply-button" onClick={onReply}>Reply</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
