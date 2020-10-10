import React from 'react';

import './SearchBar.scss';

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
