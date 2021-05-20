import React from 'react';

export default function ListItem({ item, render, next }) {
  const content = render(item, next);
  const itemClass = item.isActive ? 'list-group-item active' : 'list-group-item';

  return <li className={itemClass}>{content}</li>;
}
