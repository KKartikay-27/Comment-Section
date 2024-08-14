import React, { useState } from 'react';
import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm';
import './CommentList.css';

const CommentList = ({ comments, onDelete, onEdit, onReply }) => {
  const [replyTo, setReplyTo] = useState(null);

  const handleReplyClick = (commentId) => {
    setReplyTo(replyTo === commentId ? null : commentId);
  };

  const handleReplySubmit = (reply) => {
    if (replyTo) {
      onReply(replyTo, reply);
      setReplyTo(null); // Close the reply form after submission
    }
  };

  return (
    <div className="comment-list">
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <Comment
              comment={comment}
              onDelete={onDelete}
              onEdit={onEdit}
              onReply={() => handleReplyClick(comment.id)}
              isReply={false} // Pass false for top-level comments
            />
            {replyTo === comment.id && (
              <CommentForm
                onSubmit={handleReplySubmit}
                parentId={comment.id}
              />
            )}
            {comment.replies.length > 0 && (
              <div className="replies">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="reply">
                    <Comment
                      comment={reply}
                      onDelete={onDelete}
                      onEdit={onEdit}
                      isReply={true} // Pass true for replies
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
