import React, { useState } from 'react';

const SelectorPay = ({ options, label, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div>
      <label>{label}</label>
      <select value={selectedOption} onChange={handleChange}>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectorPay;
