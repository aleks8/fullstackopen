import { useState } from 'react';
import PropTypes from 'prop-types';
import { useUserValue } from '../UserContext';

const AddCommentForm = ({
  id,
  addComment,

}) => {

  const [newContent, setNewContent] = useState('');

  //part of 7.13 answer 
  const user = useUserValue();

  const handleContentChange = event => {
    setNewContent(event.target.value);
  };

  const addCommentInForm= event => {
    event.preventDefault();

    addComment(
      {id: id, 
      content: newContent}
     );
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={addCommentInForm}>
        <input
          data-testid="content"
          value={newContent}
          onChange={handleContentChange}
          placeholder="write content here"
        />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AddCommentForm;