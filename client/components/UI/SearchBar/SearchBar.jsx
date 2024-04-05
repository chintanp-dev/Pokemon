import React, { useRef, useState } from 'react';
import SearchIcon from '../../Images/SearchIcon.png';
import './SearchBar.scss';

function SearchBar({ onSearch }) {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  const validate = () => {
    const searchQuery = inputRef.current.value.trim();
    if (searchQuery.length >= 0) {
      onSearch(searchQuery);
    }
  };

  const handleChange = (e) => {
    setValue(validate);
  };

  return (
    <div className='input_box'>
      <img src={SearchIcon.src} />
      <input
        value={value}
        ref={inputRef}
        onChange={handleChange}
        type='text'
        placeholder='Search by name'
      />
    </div>
  );
}

export default SearchBar;
