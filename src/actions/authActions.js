import { createAsyncThunk } from "@reduxjs/toolkit";
import { logIn } from "../api";

export const login = createAsyncThunk(
  "admin/login",
  async ({ loginData, navigate }, { rejectWithValue }) => {
    try {
      const { username, password, clientTime } = loginData;
      console.log("Login request data:", { username, clientTime });
      const response = await logIn({ username, password, clientTime });
      console.log("Login response:", response.data);

      const { token, result: admin } = response.data;
      localStorage.setItem("Profile", JSON.stringify({ token, admin }));
      console.log("Login success, user and token stored in localStorage");

      // Navigating to dashboard while disabling back navigation
      navigate("/dashboard", { replace: true });
      return { token, result: admin };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to login";
      console.error("Login error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
