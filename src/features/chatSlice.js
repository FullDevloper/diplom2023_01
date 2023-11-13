import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const conversation_endpoint=`http://localhost:8001/api/v1/conversation`
const initialState = {
    status: "",
    error: "",
    conversations: [],
    activeConversation: {},
    messages: [],
    notifications: [],
    files: [],
  };
  export const getConversations=createAsyncThunk("conversation/all",async(token,{rejectWithValue})=>{
    try{
        const {data} =await axios.get(conversation_endpoint,{
            headers:{Authorization:`Bearer ${token}`}
        })
        return data
    }catch(err){
        return rejectWithValue(err.response.data);
    }
  })
export const chatSlice =createSlice({
    name:"chat",
    initialState,
    reducers:{setActiveConversation:(state,action)=>{
        state.activeConversation=action.payload
    }},
    extraReducers(builder) {
        builder
          .addCase(getConversations.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(getConversations.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.conversations = action.payload;
          })
          .addCase(getConversations.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })}
})
export const {setActiveConversation}=chatSlice.actions;
export default chatSlice.reducer