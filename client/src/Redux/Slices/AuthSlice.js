import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || {},
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
        return data.data.message;
      },
      error: "Failed to logged in, try again!",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

//creating asyncThunk for creating account
export const logout = createAsyncThunk('/auth/logout', async ()=>{
  try {
    const res = axiosInstance.get('/user/logout');
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
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  //implementing extra reducers
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) =>{
      localStorage.setItem('data', JSON.stringify(action?.payload?.user))
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('role', action?.payload?.user?.role)

      state.isLoggedIn = true
      state.data = action?.payload?.user
      state.role = action?.payload?.user?.role
    })
    .addCase(logout.fulfilled, (state)=>{
      localStorage.clear();

      state.isLoggedIn = false
      state.data = {}
      state.role = ""      
    })
  }
});

export const {} = authSlice.actions;

export default authSlice.reducer;
