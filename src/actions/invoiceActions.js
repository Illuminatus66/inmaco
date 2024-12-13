import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchInvoices,
  createInvoice,
  deleteInvoice,
  updateInvoice,
  filterInvoices,
} from "../api";

export const fetchinvoices = createAsyncThunk(
  "invoice/fetchinvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchInvoices();
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch invoices";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createinvoice = createAsyncThunk(
  "invoice/createinvoice",
  async (invoiceData, { rejectWithValue }) => {
    try {
      console.log("Creating invoice", invoiceData);
      await createInvoice(invoiceData);
      console.log("Invoice created", invoiceData);
      return { invoiceData };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create invoice";
      console.error("Error creating invoice:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteinvoice = createAsyncThunk(
  "invoice/deleteinvoice",
  async (invoiceNumber, { rejectWithValue }) => {
    try {
      console.log("Deleting invoice", invoiceNumber);
      await deleteInvoice(invoiceNumber);
      console.log("Invoice deleted", invoiceNumber);
      return { invoiceNumber };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete invoice";
      console.error("Error deleting invoice:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateinvoice = createAsyncThunk(
  "invoice/updateinvoice",
  async (originalInvoiceNumberWithEditedInvoice, { rejectWithValue }) => {
    try {
      const {originalInvoiceNumber, editInvoice} = originalInvoiceNumberWithEditedInvoice
      console.log(`Updating invoice ${originalInvoiceNumber} to:`, editInvoice);
      await updateInvoice(originalInvoiceNumber, editInvoice);
      console.log(`Updated invoice ${originalInvoiceNumber} to:`, editInvoice);
      return { originalInvoiceNumber, editInvoice };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update invoice";
      console.error("Error updating invoice:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const filterinvoices = createAsyncThunk(
  "invoice/filterinvoices",
  async (filterData, { rejectWithValue }) => {
    try {
      console.log("Filtering according to these requirements", filterData);
      const invoices = await filterInvoices(filterData);
      console.log("Filtered invoices are:", invoices.data);
      return invoices.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to filter invoices";
      console.error("Error filtering invoices:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
