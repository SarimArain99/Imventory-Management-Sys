import React from "react";

function Button({ editingRowId }) {
  
  return (
    <button className="addButton w-full max-w-xl mt-5 py-3 bg-blue-700 text-white rounded-md font-medium shadow-lg hover:bg-blue-500 hover:shadow-xl transition duration-300">
      {editingRowId ? "Save Product" : "Add Product"}
    </button>
  );
}

export default Button;
