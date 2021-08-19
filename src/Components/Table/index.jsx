import React from 'react';

import { Row } from '../Row';

import './Table.css';

export const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Название</th>
          <th>Количество</th>
          <th>Расстояние</th>
        </tr>
      </thead>
      <tbody>
        {data ? (
          data.map((item) => <Row key={item.id} {...item} />)
        ) : (
          <tr>
            <td colSpan={4}>Нету записей</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
