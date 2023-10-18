import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
  courseData: [],
};

//creating asyncThunk for getting all courses
export const getAllCourses = createAsyncThunk('/course/get', async ()=>{
    try {
        const response = axiosInstance.get('/courses')
        toast.promise(response, {
            loading: "Loading Course Data",
            success: "Courses Loaded Successfully",
            error: "Failed to get courses"
        });

        return (await response).data.courses;
    } catch (error) {
        toast.error(error.response.data.message)
    }
})

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action)=>{
            console.log("PRINTING action.payload in CourseSlice.js->", action.payload)
            if(action.payload){
                state.courseData = [...action.payload]
            }
        })
    }
});

export const {} = courseSlice.actions;
export default courseSlice.reducer
