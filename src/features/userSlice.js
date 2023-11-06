import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// let API_ENDPOINT=`http://localhost:8001/api/v1/auth`
const initialState = {
    status: "",
    error: "",
    user: {
      id: "",
      name: "",
      email: "",
      picture: "",
      status: "",
      token: "",
    },
  };
  export const registerUser = createAsyncThunk(
    "auth/register",
    async (values, { rejectWithValue }) => {
        console.log(values.data,"ss")
      try {
        const { data } = await axios.post('http://localhost:8001/api/v1/auth/register', {
          ...values.data,
        });
        return data;
      } catch (error) {
        return rejectWithValue(error.response);
      }
    }
  );
export const userSlice =createSlice({
    name:"user",
    initialState,
    reducers:{
        logout:(state)=>{
            state.status="";
            state.error="";
            state.user={
                id:"",
                name:"",
                email:"",
                picture:"",
                status:"",
                token:""
            }
        }
    },
    extraReducers(builder){
        builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
    }
})
export const {logout} =userSlice.actions;
export default userSlice.reducer