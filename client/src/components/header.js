import React, { useState } from 'react';

function Header({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Function to detect Enter key press in the input field
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSearch(searchTerm);
        }
    };

    return (
        <header className="header">
            <h1 id="header-title">Fake Stack Overflow</h1>
            <input
                id="search-bar"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress} 
            />
        </header>
    );
}

export default Header;