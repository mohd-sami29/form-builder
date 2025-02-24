import { useState } from 'react';

function FormField({ field, onChange }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(field.id, e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold">{field.label}</label>
      {field.type === 'text' && (
        <input
          type="text"
          className="border p-2 w-full"
          value={value}
          onChange={handleChange}
        />
      )}
      {field.type === 'number' && (
        <input
          type="number"
          className="border p-2 w-full"
          value={value}
          onChange={handleChange}
        />
      )}
      {field.type === 'date' && (
        <input
          type="date"
          className="border p-2 w-full"
          value={value}
          onChange={handleChange}
        />
      )}
      {field.type === 'radio' && field.options?.map((option) => (
        <label key={option} className="block">
          <input
            type="radio"
            name={field.id}
            value={option}
            checked={value === option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default FormField;
