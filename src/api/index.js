import axios from "axios";

const API = axios.create({
  baseURL: "https://inmaco-backend.onrender.com",
});

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('Profile');
  if (profile && profile.token) {
    req.headers.authorization = `Bearer ${profile.token}`;
  }
  return req;
});

export const logIn = (loginData) => 
  API.post("/api/admin/auth", loginData);

export const fetchInvoices = () =>
    API.get("api/invoices/all", { withCredentials: true });
export const createInvoice = (invoiceData) =>
  API.post("api/invoices/create", invoiceData, { withCredentials: true });
export const deleteInvoice = (invoiceNumber) =>
  API.delete(`api/invoices/delete/${invoiceNumber}`, { withCredentials: true });
export const updateInvoice = (originalInvoiceNumber, editInvoice) =>
    API.patch(`api/invoices/update/${originalInvoiceNumber}`,editInvoice, { withCredentials: true });
export const filterInvoices = (filterData) =>
  API.get("api/invoices/filter", { params: filterData, withCredentials: true });

