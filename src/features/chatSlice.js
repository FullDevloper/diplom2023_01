import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const conversation_endpoint=`http://localhost:8001/api/v1/conversation`
const MESSAGE_ENDPOINT=`http://localhost:8001/api/v1/message`

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
export const open_create_conversation = createAsyncThunk(
    "conervsation/open_create",
    async (values, { rejectWithValue }) => {
      const { token, receiver_id, isGroup } = values;
      try {
        const { data } = await axios.post(
          conversation_endpoint,
          { receiver_id, isGroup },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
export const getConversationMessages = createAsyncThunk(
    "conervsation/messages",
    async (values, { rejectWithValue }) => {
      const { token, convo_id } = values;
      try {
        const { data } = await axios.get(
         `${MESSAGE_ENDPOINT}/${convo_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const sendMessage = createAsyncThunk(
    "message/send",
    async (values, { rejectWithValue }) => {
      const { token, message, convo_id ,files} = values;
      try {
        const { data } = await axios.post(
          MESSAGE_ENDPOINT,
          {
            message,
            convo_id,
            files
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
export const chatSlice =createSlice({
    name:"chat",
    initialState,
    reducers:{
      setActiveConversation:(state,action)=>{
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
          })
          .addCase(open_create_conversation.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(open_create_conversation.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.activeConversation = action.payload;
          })
          .addCase(open_create_conversation.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })
          .addCase(getConversationMessages.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(getConversationMessages.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.messages = action.payload;
          })
          .addCase(getConversationMessages.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })
          .addCase(sendMessage.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(sendMessage.fulfilled, (state, action) => {
            state.status = "succeeded";
           
            state.messages = [...state.messages,action.payload];
            let conversation={...action.payload.conversation,latestMessage:action.payload};

            let newConvos = [...state.conversations].filter(
              (c) => c._id !== conversation._id
            );
            console.log("Newconvos",newConvos)
            newConvos.unshift(conversation);
            state.conversations = newConvos;
            state.files = [];
          })
          .addCase(sendMessage.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })
        
        }
})

export const {setActiveConversation}=chatSlice.actions;
export default chatSlice.reducer