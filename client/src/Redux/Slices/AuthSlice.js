import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data:
    localStorage.getItem("data") !== undefined
      ? JSON.parse(localStorage.getItem("data"))
      : {},
};

//creating asyncThunk for creating account
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("/user/register", data);
    toast.promise(res, {
      loading: "Wait!, Your account is creating",
      success: (data) => {
        return data.data.message;
      },
      error: "Failed to creating account, try again!",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

//creating asyncThunk for login
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("/user/login", data);
    toast.promise(res, {
      loading: "Wait!, Checking Authentication",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logged in, try again!",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

//creating asyncThunk for creating account
export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.get("/user/logout");
    toast.promise(res, {
      loading: "Wait!, You are logging out",
      success: (data) => {
        return data.data.message;
      },
      error: "Failed to logged out, try again!",
    });
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

//creating asyncThunk for updating user profile
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      const res = axiosInstance.put(`/user/update/${data[0]}`, data[1]);
      toast.promise(res, {
        loading: "Wait!, Your profile is updating...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update profile, try again!",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

//creating asyncThunk for gettingUser data
export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get("/user/me");
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});

//asyncThunk for change password
export const changePassword = createAsyncThunk(
  "/user/change/password",
  async (data) => {
    try {
      const response = axiosInstance.post("/user/change-password", data);
      toast.promise(response, {
        loading: "Changing your password...",
        success: "Password Changed Successfully",
        error: "Password cannot changed, try again!",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

//asyncThunk for forget-password
export const forgetPassword = createAsyncThunk(
  "/user/forget/password",
  async (data) => {
    try {
      const response = axiosInstance.post("/user/reset", data);
      toast.promise(response, {
        loading: "Sending reset password link on your email",
        success: `Reset password link send at ${data?.email}`,
        error: "Failed to send reset password link, try again!",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.message);
    }
  }
);

//asyncThunk for reset-password
export const resetPassword = createAsyncThunk(
  "/user/reset/password",
  async (data) => {
    try {
      const response = axiosInstance.post(`/user/reset/${data[0]}`, data[1]);
      toast.promise(response, {
        loading: "Password reset is in progress",
        success: "Password reset successfully",
        error: "Failed to reset password, try again",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  //implementing extra reducers
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("role", action?.payload?.user?.role);

          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user?.role;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();

        state.isLoggedIn = false;
        state.data = {};
        state.role = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);

        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
