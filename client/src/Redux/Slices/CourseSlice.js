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
});

export const createNewCourse = createAsyncThunk('/course/create', async (data)=>{
    try {
        let formData = new FormData()
        formData.append("title", data?.title)
        formData.append("description", data?.description)
        formData.append("category", data?.category)
        formData.append("createdBy", data?.createdBy)
        formData.append("thumbnail", data?.thumbnail);

        const response = axiosInstance.post('/courses', formData)
        toast.promise(response, {
            loading: "Creating New Course, please wait",
            success: "Congrats👍👌 Your Course Created Successfully",
            error: "Failed To Create Course",
        });
        return (await response).data

    } catch (error) {
        toast.error(error?.response?.data?.message)
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
