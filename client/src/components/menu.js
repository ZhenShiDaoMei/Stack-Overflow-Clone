import React from 'react';

function Menu({ activeItem, setActiveItem, onQuestionsLinkClick }) {
  const menuItems = [
    { id: 'questions-link', label: 'Questions' },
    { id: 'tags-link', label: 'Tags' }
  ];

  // Handles when menu-links are clicked
  const handleClick = (id) => {
    // if (id === 'questions-link') {
    //   onQuestionsLinkClick();
    // } else {
    // }
    setActiveItem(id);
  };

  return (
    <div id="menu">
      <ul>
        {menuItems.map(item => (
          <li
            key={item.id}
            className={activeItem === item.id ? 'active' : ''}
            onClick={() => handleClick(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;