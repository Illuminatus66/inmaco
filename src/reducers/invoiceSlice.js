import { createSlice } from "@reduxjs/toolkit";
import {
  fetchinvoices,
  filterinvoices,
  createinvoice,
  deleteinvoice,
  updateinvoice,
} from "../actions/invoiceActions";

const initialState = {
  invoices: [],
  // This is a separate field to conditionally store filtered invoices
  // since explicit use of API calls for filtering are required in the task.
  // In most other cases filtering and searching should happen on
  // the data available in the frontend instead of overloading the backend server
  // with unnecessary/repeated requests.
  filteredInvoices: [],
  loading: false,
  error: null,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    clearAllInvoices(state) {
      state.invoices = [];
      state.filteredInvoices = [];
      state.loading = false;
      state.error = null;
    },
    clearFilteredInvoices(state) {
      state.filteredInvoices = [];
    },
    clearInvoiceError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchinvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchinvoices.fulfilled, (state, action) => {
        state.invoices = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchinvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch invoices";
      })
      .addCase(createinvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createinvoice.fulfilled, (state, action) => {
        state.invoices.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createinvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create invoice";
      })
      .addCase(deleteinvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteinvoice.fulfilled, (state, action) => {
        // Remove from both `invoices` and `filteredInvoices`
        state.invoices = state.invoices.filter(
          (invoice) => invoice.invoiceNumber !== action.payload.invoiceNumber
        );
        state.filteredInvoices = state.filteredInvoices.filter(
          (invoice) => invoice.invoiceNumber !== action.payload.invoiceNumber
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteinvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete invoice";
      })
      .addCase(updateinvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateinvoice.fulfilled, (state, action) => {
        const index = state.invoices.findIndex(
          (invoice) => invoice.invoiceNumber === action.payload.originalInvoiceNumber
        );
        if (index !== -1) {
          state.invoices[index] = action.payload.editInvoice;
        }
        state.filteredInvoices= [];
        state.loading = false;
        state.error = null;
      })
      .addCase(updateinvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update invoice";
      })
      .addCase(filterinvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterinvoices.fulfilled, (state, action) => {
        state.filteredInvoices = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(filterinvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to filter invoices";
      });
  },
});

export const { clearAllInvoices, clearFilteredInvoices, clearInvoiceError } = invoiceSlice.actions;

export const selectInvoices = (state) => state.invoice.invoices;
export const selectFilteredInvoices = (state) => state.invoice.filteredInvoices;
export const selectinvoiceLoading = (state) => state.invoice.loading;
export const selectinvoiceError = (state) => state.invoice.error;

export default invoiceSlice.reducer;
