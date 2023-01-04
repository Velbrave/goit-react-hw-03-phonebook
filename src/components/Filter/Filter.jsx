import React from 'react';
import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  return (
    <label className={css.label} htmlFor="">
      Find contacts by name
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Filter;

Filter.protoTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
