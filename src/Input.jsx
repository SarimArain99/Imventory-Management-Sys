import React from "react";

function Input({
  label,
  value,
  onChange,
  name,
  id,
  errors,
  type,
  placeHolder,
}) {
  return (
    <div className="labals flex flex-col space-y-2 text-gray-500 font-medium h-24">
      <label htmlFor={id}>
        <b>{label}</b>
      </label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeHolder}
        className="allInputs w-full max-w-xl p-3 bg-gray-100 border border-gray-400 rounded-md shadow focus:border-blue-700 focus:shadow-lg transition duration-300"
      ></input>
      <p className="text-red-500 text-xs">{errors}</p>
    </div>
  );
}

export default Input;
