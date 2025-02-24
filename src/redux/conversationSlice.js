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

                const currentParticipants = conv.participants.map(p => p._id).sort();
                const newParticipants = newConversation.participants.map(p => p._id).sort();
                return currentParticipants.join() === newParticipants.join();
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