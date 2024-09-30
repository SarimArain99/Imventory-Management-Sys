import { useState } from "react";
import "./App.css";
import FormInputs from "./FormInputs";
import FormList from "./FormList";
import { useLocalStorge } from "../hooks/useLocalStorage";

function App() {
  const [expenses, setExpenses] = useLocalStorge('expenses', []);
  const [expanse, setExpense] = useState({
    Title: "",
    Category: "",
    Price: "",
  });
  const [editingRowId, setEditingRowId] = useState("");
  return (
    <>
      <div className="bg-gray-50 font-roboto">
        <h1 className="InventoryHeading bg-gray-900 text-white font-poppins text-2xl font-semibold py-4 px-6 border-b-2 border-gray-300 cursor-default">
          Inventory Management System
        </h1>
        <div className="outerContainer sm:flex-row flex-col md:flex justify-between sm:p-10  pr-2 max-w-screen ">
          <FormInputs
            setExpenses={setExpenses}
            expanse={expanse}
            setExpense={setExpense}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
          />
          <FormList
            expenses={expenses}
            setExpenses={setExpenses}
            setExpense={setExpense}
            setEditingRowId={setEditingRowId}
          />
        </div>
      </div>
    </>
  );
}

export default App;
