import { createSlice } from "@reduxjs/toolkit"

const allConversationsSlice = createSlice({
    name: "allConversations",
    initialState: {
        allConversations: [],
    },
    reducers: {
        setAllConversations: (state, action) => {
            state.allConversations = action.payload
        },
        addOrUpdateConversation: (state, action) => {
            const newConversation = action.payload;

            const index = state.allConversations.findIndex((conv) => {
                return conv._id === newConversation._id;
            });

            if (index !== -1) {
                state.allConversations[index] = newConversation;
            } else {

                state.allConversations.push(newConversation);
            }
        }
    }
});
export const { setAllConversations, addOrUpdateConversation } = allConversationsSlice.actions;
export default allConversationsSlice.reducer