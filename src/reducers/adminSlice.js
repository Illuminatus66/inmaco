import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/authActions";

const initialState = {
  data: {
    token: null,
    user: null,
  },
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout(state) {
      state.data.token = null;
      state.data.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = {
          token: action.payload.token,
          user: action.payload.result,
        };
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      });
  },
});

export const { logout } = adminSlice.actions;

export const selectUserToken = (state) => state.admin.data?.token;
export const selectUserName = (state) => state.admin.data?.user?.username;
export const selectUserId = (state) => state.admin.data?.user?._id;
export const selectUserLoading = (state) => state.admin.loading;
export const selectUserError = (state) => state.admin.error;

export default adminSlice.reducer;
