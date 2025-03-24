import { useState } from 'react';
import PropTypes from 'prop-types';
import { useUserValue } from '../UserContext';
import { Button, Input } from '../App';

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
      <h3>create new</h3>
      <form onSubmit={addCommentInForm}>
        <Input
          data-testid="content"
          value={newContent}
          onChange={handleContentChange}
          placeholder="write content here"
        />
        <Button type="submit">create</Button>
      </form>
    </div>
  );
};

export default AddCommentForm;