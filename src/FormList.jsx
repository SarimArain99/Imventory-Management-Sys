import { useState } from "react";
import { useFilter } from "../hooks/useFilter";
import ContextMenu from "./ContextMenu";

function FormList({ expenses, setExpenses, setExpense, setEditingRowId }) {
  const [filteredData, setQuery] = useFilter(expenses, (data) => data.Category);
  const [rowId, setRowId] = useState("");
  const total = filteredData.reduce(
    (prev, crrVal) => prev + parseFloat(crrVal.Price),
    0
  );
  const [menuPosition, setMenuPosition] = useState({});
  const [sorting, setSorting] = useState(() => () => {});

  return (
    <>
      <div className="cursor-default" onClick={() => setMenuPosition({})}>
        <ContextMenu
          menuPosition={menuPosition}
          expenses={expenses}
          setExpense={setExpense}
          setMenuPosition={setMenuPosition}
          setExpenses={setExpenses}
          rowId={rowId}
          setEditingRowId={setEditingRowId}
        />
        <table
          className="w-full border-collapse border border-gray-300 shadow-lg m-1 shadow-gray-300"
          onClick={() => {
            if (menuPosition.left) {
              setMenuPosition({});
            }
          }}
        >
          <thead>
            <tr className="bg-gray-900 text-white uppercase text-left">
              <th className="py-4 sm:px-8 px-4 sm:text-lg text-sm">Title</th>
              <th className="py-4 sm:px-8 px-4">
                <select
                  onChange={(e) => setQuery(e.target.value)}
                  name="select"
                  id="select"
                  className="text-white bg-gray-900 outline-none sm:text-lg text-sm"
                >
                  <option value="">All</option>
                  <option value="Education">Education</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Bills">Bills</option>
                </select>
              </th>
              <th className="py-4 sm:px-10 px-3 gap-x-3 flex sm:flex-row flex-col items-center sm:text-lg text-xs">
                Price
                <div className="flex">
                  <button
                    title="Ascending"
                    className=" active:text-gray-400"
                    onClick={() => {
                      setSorting(() => (a, b) => a.Price - b.Price);
                    }}
                  >
                    &#8593;
                  </button>
                  <button
                    title="descending"
                    className=" active:text-gray-400"
                    onClick={() => {
                      setSorting(() => (a, b) => b.Price - a.Price);
                    }}
                  >
                    &#8595;
                  </button>
                </div>
                <button
                  title="Clear Sorting"
                  className=" text-white active:bg-gray-700 sm:text-sm text-xs border border-white h-6 w-11 rounded"
                  onClick={() => {
                    setSorting(() => () => {}); // Reset the array to the original state
                  }}
                >
                  Clear
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              .sort(sorting)
              .map(({ id, Title, Category, Price }) => (
                <tr
                  className="hover:bg-gray-200"
                  key={id}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    const table = e.currentTarget.getBoundingClientRect();
                    let left = e.clientX + 4;
                    let top = e.clientY + 4;
                    if (left + 100 > table.right) {
                      left = table.right - 100;
                    }
                    if (top + 80 > table.bottom) {
                      top = table.bottom - 80;
                    }
                    setMenuPosition({ left, top });
                    setRowId(id);
                  }}
                >
                  <td className="py-4 sm:px-8 px-4 sm:text-lg text-sm outline-none">
                    {Title}
                  </td>
                  <td className="py-4 sm:px-8 px-4 sm:text-lg text-sm outline-none">
                    {Category}
                  </td>
                  <td className="py-4 sm:px-8 px-4 sm:text-lg text-sm">
                    Rs. <span className="outline-none">{Price}</span>
                  </td>
                </tr>
              ))}
            <tr className="h-12"></tr>
            <tr className="bg-gray-400 border border-gray-300">
              <td className="py-4 sm:px-8 px-4 font-bold sm:text-xl text-sm">
                Total
              </td>
              <td></td>
              <td className="py-4 sm:px-6 px-4 font-bold  sm:text-xl text-sm">
                Rs. {total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FormList;
