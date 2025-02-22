import { createSlice } from "@reduxjs/toolkit"
const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        otherUsers: null,
        selectedUser: null,
        onlineUsers: null
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        },
        updateLastSeen(state, action) {
            const { userId, lastSeen } = action.payload;
            // const userIndex = state.otherUsers.findIndex(user => user.userId === userId);
            // if (userIndex !== -1) {
            //     state.otherUsers[userIndex].lastSeen = lastSeen;
            // }
            if (state.selectedUser && state.selectedUser._id === userId) {
                state.selectedUser.lastSeen = lastSeen;
            }
        },
    }
})
export const { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers, updateLastSeen } = userSlice.actions;
export default userSlice.reducer