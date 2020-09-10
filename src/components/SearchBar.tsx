import React, { useState } from 'react';

import './SearchBar.css';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface SearchBarProps {
  handleChange: (event: InputEvent) => void;
  value: string;
}

export default ({ handleChange, value }: SearchBarProps) => {
  return (
    <input
      className="search-bar"
      onChange={handleChange}
      value={value}
      placeholder="Search for a song..."
    />
  );
};
