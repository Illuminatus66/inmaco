import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInvoices,
  selectFilteredInvoices,
  selectinvoiceLoading,
  selectinvoiceError,
  clearInvoiceError,
  clearFilteredInvoices,
} from "../../reducers/invoiceSlice";
import { selectUserId } from "../../reducers/adminSlice";
import {
  deleteinvoice,
  updateinvoice,
  filterinvoices,
  fetchinvoices,
  createinvoice,
} from "../../actions/invoiceActions";
import CreateInvoice from "../../components/CreateInvoice/CreateInvoice";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../../components/CreateInvoice/CreateInvoice.css";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserId);
  const invoices = useSelector(selectInvoices);
  const filteredInvoices = useSelector(selectFilteredInvoices);
  const loading = useSelector(selectinvoiceLoading);
  const error = useSelector(selectinvoiceError);

  const invoicesToDisplay =
    filteredInvoices.length > 0 ? filteredInvoices : invoices;

  const [editInvoice, setEditInvoice] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    financialYear: "",
    startDate: "",
    endDate: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const financialYears = invoices.length
    ? [...new Set(invoices.map((invoice) => invoice.financialYear))]
    : [];

  const getFinancialYear = (date) => {
    const validDate = typeof date === "string" ? new Date(date) : date;
    console.log("The date looks like this:", validDate);
    if (isNaN(validDate)) {
      throw new Error("Invalid date provided to getFinancialYear");
    }
    const year = date.getFullYear();
    const month = date.getMonth();
    const startYear = month >= 3 ? year : year - 1;
    return startYear;
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchinvoices());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearInvoiceError());
      }, 3000);
      return () => clearTimeout(timer); // Clear timer on unmount or error change
    }
  }, [error, dispatch]);

  const handleInvoiceCreation = (newInvoice) => {
    dispatch(createinvoice(newInvoice));
    console.log("New Invoice Created:", newInvoice);
  };

  const handleEdit = (invoice) => {
    setEditInvoice({ ...invoice });
  };

  const isValidDateString = (dateString) => {
    // Simple regex to check if the date string is in YYYY-MM-DD format
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const handleDateEditChange = (e) => {
    const { name, value } = e.target;

    // Only update if the value is a valid date string
    if (name === "invoiceDate" && isValidDateString(value)) {
      const startYear = getFinancialYear(new Date(value));
      const currentInvoiceNumber = editInvoice.invoiceNumber.substring(4);
      console.log(
        `Current Invoice Number is ${currentInvoiceNumber} and Complete Invoice Number is ${editInvoice.invoiceNumber}`
      );
      setEditInvoice((prevState) => ({
        ...prevState,
        [name]: value,
        invoiceNumber: `${startYear}${currentInvoiceNumber}`,
      }));
    } else {
      console.log("Invalid date input, waiting for a valid date string.");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditInvoice((prevState) => {
      // Prepending the year from the selected date to the invoice number
      if (name === "invoiceNumber") {
        const startYear = getFinancialYear(new Date(prevState.invoiceDate));
        return {
          ...prevState,
          [name]: `${startYear}${value}`,
        };
      }

      // Update other fields
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSave = () => {
    console.log("handleSave action triggered");
    const originalInvoice = invoices.find((inv) => inv._id === editInvoice._id);
    console.log("Original Invoice:", originalInvoice);
    if (originalInvoice) {
      console.log("Original Invoice number:", originalInvoice.invoiceNumber);
      const originalInvoiceNumber = originalInvoice.invoiceNumber;
      dispatch(updateinvoice({ originalInvoiceNumber, editInvoice }));
      console.log("Dispatched async thunk action");
    }
    setEditInvoice(null);
  };

  const handleDelete = (invoiceNumber) => {
    dispatch(deleteinvoice(invoiceNumber));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilterCriteria((prev) => ({
      ...prev,
      invoiceNumber: value || "", // Clear invoiceNumber when the searchTerm is cleared
    }));
  };

  const applySearch = () => {
    dispatch(filterinvoices({ invoiceNumber: searchTerm }));
  };

  const clearFilters = () => {
    setFilterCriteria({
      financialYear: "",
      startDate: "",
      endDate: "",
    });
    setSearchTerm("");
    dispatch(clearFilteredInvoices());
  };

  const handleFilter = () => {
    dispatch(filterinvoices(filterCriteria));
  };

  return (
    <div className="dashboard">
        <Header />
      <div className="main-content">
        <div className="filter-section">
          <p>
            The 'Apply Filters' button applies to all of the searching/filtering
            options, this means that any text present in the search box will be
            searched for along with any active filters. If you simply want to
            search for an Invoice Number without having any other active
            filters, then use the search button instead.
          </p>
          <h3>Filters</h3>
          {/* Invoice Number Search */}
          <div className="search-section">
            <input
              type="number"
              placeholder="Search by Invoice Number"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button onClick={applySearch} title="Search">
              🔍
            </button>
          </div>

          {/* Financial Year Filter */}
          <div className="financial-year-section">
            <h4>Financial Year</h4>
            <select
              value={filterCriteria.financialYear}
              onChange={(e) =>
                setFilterCriteria({
                  ...filterCriteria,
                  financialYear: e.target.value,
                })
              }
            >
              <option value="">Select Financial Year</option>
              {financialYears?.length > 0 ? (
                financialYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))
              ) : (
                <option disabled>No financial years available</option>
              )}
            </select>
            <button
              onClick={() =>
                setFilterCriteria({ ...filterCriteria, financialYear: "" })
              }
            >
              Clear Financial Year Filter
            </button>
          </div>

          {/* Date Range Filter */}
          <div className="date-range-section">
            <h4>Date Range</h4>
            <input
              type="date"
              placeholder="Start Date"
              value={filterCriteria.startDate}
              max={filterCriteria.endDate || undefined}
              onChange={(e) =>
                setFilterCriteria({
                  ...filterCriteria,
                  startDate: e.target.value,
                })
              }
            />
            <input
              type="date"
              placeholder="End Date"
              value={filterCriteria.endDate}
              min={filterCriteria.startDate || undefined}
              onChange={(e) =>
                setFilterCriteria({
                  ...filterCriteria,
                  endDate: e.target.value,
                })
              }
            />
            <button
              onClick={() =>
                setFilterCriteria({
                  ...filterCriteria,
                  startDate: "",
                  endDate: "",
                })
              }
            >
              Clear Date Filters
            </button>
          </div>
          <button onClick={handleFilter} className="apply-filters">
            Apply Chosen Filters
          </button>
          <button onClick={clearFilters} className="clear-all">
            Clear All Filters
          </button>
        </div>

        {/* Invoices Section */}
        <div className="invoice-section">
          <CreateInvoice onCreate={handleInvoiceCreation} />
          <h3>Invoices</h3>
          <div className="invoice-list">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && invoicesToDisplay.length === 0 && (
              <p>No invoices to display</p>
            )}
            {!loading &&
              !error &&
              invoicesToDisplay?.length > 0 &&
              invoicesToDisplay?.map((invoice) => (
                <div key={invoice._id} className="invoice-item">
                  {editInvoice && editInvoice._id === invoice._id ? (
                    <>
                      <label>
                        Invoice No:
                        <input
                          type="number"
                          name="invoiceNumber"
                          value={editInvoice.invoiceNumber.substring(4)}
                          onChange={handleEditChange}
                        />
                      </label>
                      <label>
                        Date(in MM/DD/YYYY):
                        <input
                          type="date"
                          name="invoiceDate"
                          value={editInvoice.invoiceDate.split("T")[0]}
                          onChange={handleDateEditChange}
                        />
                      </label>
                      <label>
                        Amount(in INR):
                        <input
                          type="number"
                          name="invoiceAmount"
                          value={editInvoice.invoiceAmount}
                          onChange={handleEditChange}
                        />
                      </label>
                      <button onClick={handleSave}>✔</button>
                      <button onClick={() => setEditInvoice(null)}>❌</button>
                    </>
                  ) : (
                    <>
                      <span className="invoice-field">
                        <strong>Invoice No:</strong>{" "}
                        {invoice.invoiceNumber.substring(4)}
                      </span>
                      <span className="invoice-field">
                        <strong>Date:</strong>{" "}
                        {new Date(invoice.invoiceDate).toLocaleDateString()}
                      </span>
                      <span className="invoice-field">
                        <strong>Amount:</strong> {invoice.invoiceAmount}
                      </span>
                      <button onClick={() => handleEdit(invoice)}>✏️</button>
                      <button
                        onClick={() => handleDelete(invoice.invoiceNumber)}
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="bottom">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
