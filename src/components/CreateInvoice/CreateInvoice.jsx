// CreateInvoice.jsx
import React, { useState } from "react";
import "./CreateInvoice.css";

const CreateInvoice = ({ onCreate }) => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    invoiceAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onCreate) {
      onCreate(invoiceData);
    }
    setInvoiceData({ invoiceNumber: "", invoiceDate: "", invoiceAmount: "" });
  };

  return (
    <div className="create-invoice">
      <h3>Create Invoice</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Invoice No:
          <input
            type="number"
            name="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="invoiceDate"
            value={invoiceData.invoiceDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="invoiceAmount"
            value={invoiceData.invoiceAmount}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Invoice</button>
      </form>
    </div>
  );
};

export default CreateInvoice;
