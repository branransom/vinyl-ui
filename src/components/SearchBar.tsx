import React, { useState } from 'react';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default () => {
  const [value, setValue] = useState('');

  const handleChange = (event: InputEvent) => {
    setValue(event.target.value);
  };

  return (
    <input
      onChange={handleChange}
      value={value}
      placeholder="Search for a song"
    />
  );
};
