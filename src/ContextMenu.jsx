import React from "react";

function ContextMenu({
  menuPosition,
  setMenuPosition,
  setExpenses,
  rowId,
  expenses,
  setExpense,
  setEditingRowId,
}) {
  if (!menuPosition.left) return;

  return (
    <div
      style={{
        ...menuPosition,
      }}
      className={`bg-gray-900 text-white p-1 rounded-md m-2 text-center absolute shadow-xl shadow-gray-400 border-2 border-white`}
    >
      <div
        className="hover:bg-gray-700 cursor-pointer"
        onClick={() => {
          const {Title, Category, Price} = expenses.find((expense) => expense.id === rowId)
          setExpense({Title, Category, Price})
          setEditingRowId(rowId)
        }}
      >
        Edit
      </div>
      <div
        className="hover:bg-gray-700 cursor-pointer"
        onClick={() => {
          setExpenses((prevState) =>
            prevState.filter((expense) => expense.id !== rowId)
          );
          setMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
}

export default ContextMenu;
