import React from 'react';

type Tags = 'h1' | 'h2';

type TextProps = {
  tag: Tags;
  className: string;
  title: string;
};

export const Text: React.FC<TextProps> = ({ tag, className, title }) => {
  return React.createElement(tag, { className }, title);
};
