import React from "react";

function Select({
  label,
  value,
  onChange,
  name,
  id,
  errors,
  options,
  defaultName,
}) {
  return (
    <div className="labals flex flex-col space-y-2 text-gray-500 font-medium h-24">
      <label htmlFor={id}>
        <b>{label}</b>
      </label>
      <select
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        className="allInputs w-full max-w-xl p-3 bg-gray-100 border border-gray-400 rounded-md shadow focus:border-blue-700 focus:shadow-lg transition duration-300"
      >
        <option hidden>{defaultName}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className="text-red-500 text-xs">{errors}</p>
    </div>
  );
}

export default Select;
