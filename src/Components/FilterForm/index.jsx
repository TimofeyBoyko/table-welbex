import React from 'react';

import './FilterForm.css';

export const FilterForm = ({ sortFields = [], sortBy = [], value = '', onChange }) => {
  return (
    <div className="filter-form">
      <div className="filter-item">
        <label>Select sort field:</label>
        <select name={'field'} onChange={onChange}>
          <option value="null"></option>
          {sortFields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-item">
        <label>Select sort by</label>
        <select name={'sortBy'} onChange={onChange}>
          <option value="null"></option>
          {sortBy.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-item">
        <label>Write value:</label>
        <input value={value} name="value" type="text" onChange={onChange} />
      </div>
    </div>
  );
};
