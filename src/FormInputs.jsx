import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

function FormInputs({
  setExpenses,
  setExpense,
  expanse,
  editingRowId,
  setEditingRowId,
}) {
  const [errors, setErrors] = useState({});

  const validateConfig = {
    Title: [{ required: true, errorMessage: "Please Enter the Title" }],
    Category: [{ required: true, errorMessage: "Please Select a Category" }],
    Price: [{ required: true, errorMessage: "Please Enter the Price" }],
  };

  function validation(formData) {
    const errorsData = {};
    Object.entries(formData).forEach(([key, value]) => {
      validateConfig[key].forEach((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.errorMessage;
        }
      });
    });
    setErrors(errorsData);
    return errorsData;
  }


  function hanldeSubmit(e) {
    e.preventDefault();
    const validationResult = validation(expanse);
    if (Object.keys(validationResult).length) return;
    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expanse, id: editingRowId };
          }
          return prevExpense;
        })
      );
      setExpense({
        Title: "",
        Category: "",
        Price: "",
      });
      setEditingRowId('')
      return
    }
    setExpenses((prevState) => [
      ...prevState,
      { ...expanse, id: crypto.randomUUID() },
    ]);
    setExpense({
      Title: "",
      Category: "",
      Price: "",
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };
  return (
    <>
      <form
        className="sm: pl-2 sm: pt-2 container flex flex-col space-y-4 mr-3"
        onSubmit={hanldeSubmit}
      >
        <Input
          value={expanse.Title}
          label="Title"
          placeHolder="Enter Product Name"
          onChange={handleChange}
          name="Title"
          type="text"
          errors={errors.Title}
          id="title"
        />

        <Select
          defaultName="Select Category"
          label="Category"
          value={expanse.Category}
          onChange={handleChange}
          name="Category"
          id="Category"
          errors={errors.Category}
          options={["Education", "Medicine", "Grocery", "Bills", "Clothes"]}
        />

        <Input
          value={expanse.Price}
          label="Price"
          placeHolder="Enter the Price "
          onChange={handleChange}
          name="Price"
          type="number"
          errors={errors.Price}
          id="price"
        />
        <Button editingRowId={editingRowId} />
      </form>
    </>
  );
}

export default FormInputs;
