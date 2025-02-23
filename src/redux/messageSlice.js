import {createSlice} from "@reduxjs/toolkit"

const allConversationsSlice=createSlice({
    name:"allConversations",
    initialState:{
        messages:[],
        allConversations:[]
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages=action.payload
        },
        setAllConversations:(state,action)=>{
            state.allConversations=action.payload
        },
        addOrUpdateConversation: (state, action) => {
            const newConversation = action.payload;
            // Check if conversation exists between the same participants
            const index = state.allConversations.findIndex((conv) => {
              // Sort participant IDs for comparison
              const currentParticipants = conv.participants.map(p => p._id).sort();
              const newParticipants = newConversation.participants.map(p => p._id).sort();
              return currentParticipants.join() === newParticipants.join();
            });
      
            if (index !== -1) {
              // Replace existing conversation
              state.allConversations[index] = newConversation;
            } else {
              // Add new conversation
              state.allConversations.push(newConversation);
            }
          }
    }
});
export const {setMessages,setAllConversations,addOrUpdateConversation}=allConversationsSlice.actions;
export default allConversationsSlice.reducer