import React from 'react';

import './Button.scss';

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
type KeyDownEvent = React.KeyboardEvent<HTMLDivElement>;

interface ButtonProps {
  content: string;
  handleClick: (event: ClickEvent | KeyDownEvent) => void;
}

export default ({ content, handleClick }: ButtonProps) => {
  return (
    <div
      className="button"
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
    >
      {content}
    </div>
  );
};
