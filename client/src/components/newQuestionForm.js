import React, { useState } from 'react';

const NewQuestionForm = ({ onSubmit }) => {

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    tags: '',
    username: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    text: '',
    tags: '',
    username: '',
  });

  // Update input info by itself
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Check the values for input
  const validateForm = () => {
    let isValid = true;
    let newErrors = { title: '', text: '', tags: '', username: '' };

    if (!formData.title) {
      newErrors.title = '*Title is required';
      isValid = false;
    } else if (formData.title.length > 100) {
      newErrors.title = '*Title cannot exceed 100 characters';
      isValid = false;
    }

    if (!formData.text) {
      newErrors.text = '*Question text is required';
      isValid = false;
    }

    if (!formData.tags) {
      newErrors.tags = '*Tags are required';
      isValid = false;
    }

    if (!formData.username) {
      newErrors.username = '*Username is required';
      isValid = false;
    }

    const tagIdsArray = formData.tags.split(/\s+/);
    if (tagIdsArray.length > 5) {
      newErrors.tags = '*No more than 5 tags allowed';
      isValid = false;
    } else if (tagIdsArray.some(tag => tag.length > 20)) {
      newErrors.tags = '*Tags cannot exceed 20 characters';
      isValid = false;
    }

    const hyperlinkRegex = /\[(.*?)\]\((http:\/\/|https:\/\/)(.*?)\)/g;
    const invalidHyperlinkRegex = /\[(.*?)\]\((?!http:\/\/|https:\/\/)(.*?)\)/g;

    if (invalidHyperlinkRegex.test(formData.text)) {
      newErrors.text = '*All hyperlinks must start with "http://" or "https://"';
      isValid = false;
    } else if (formData.text.includes('](') && !hyperlinkRegex.test(formData.text)) {
      newErrors.text = '*Invalid hyperlink format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle new question submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ title: '', text: '', tags: '', username: '' });
    }
  };

  return (
    <form id="question-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Question Title*</label>
      <p className="description">Limit title to 100 characters or less</p>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
      <p className="error">{errors.title}</p>

      <label htmlFor="text">Question Text*</label>
      <p className="description">Add details</p>
      <textarea id="text" name="text" value={formData.text} onChange={handleChange}></textarea>
      <p className="error">{errors.text}</p>

      <label htmlFor="tags">Tags*</label>
      <p className="description">Add keywords separated by whitespace</p>
      <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} />
      <p className="error">{errors.tags}</p>

      <label htmlFor="username">Username*</label>
      <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
      <p className="error">{errors.username}</p>

      <button type="submit">Post Question</button>
    </form>
  );
};

export default NewQuestionForm;
