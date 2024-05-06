import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TagsPage = ({ stackoverflow_data, onAskQuestion, onTagClick }) => {
    const [tagCounts, setTagCounts] = useState(0);
    const [tags, setTags] = useState([])
  
    useEffect(() => {
     axios.get("http://localhost:8000/tags/all" ).then(res =>{
       setTagCounts(res.data.length)
       setTags(res.data)
      console.log({res})
     })

    }, []);
  
    const totalCountTagAmount = tagCounts
  
    return (
      <div>
        <div id="tags-header">
          <h2>{totalCountTagAmount} Tags</h2>
          <h2>All Tags</h2>
          <button onClick={onAskQuestion} id="ask-question-button">Ask Question</button>
        </div>
        <div id="tags-list">
            {tags.map((tagName) => (
            <div className="tag-box" key={tagName}>
              <a href="#" className="tag-name">{tagName}</a>
            </div>
          ))}
        </div>
      </div>
    );  
  };
  
  export default TagsPage;