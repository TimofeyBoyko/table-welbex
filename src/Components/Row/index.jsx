import React from 'react';

import './Row.css';

export const Row = ({ date, name, count, dist }) => {
  return (
    <tr>
      <td>{date}</td>
      <td>{name}</td>
      <td>{count}</td>
      <td>{dist}</td>
    </tr>
  );
};
