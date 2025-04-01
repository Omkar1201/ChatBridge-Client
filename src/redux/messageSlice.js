import { createSlice } from "@reduxjs/toolkit"
const messageSlice = createSlice({
    name: "message",
    initialState: {
        selectedMessageForEdit:''
    },
    reducers: {
        setSelectedMessageForEdit:(state,action)=>{
            state.selectedMessageForEdit = action.payload
        }
    }
})
export const { setSelectedMessageForEdit } = messageSlice.actions;
export default messageSlice.reducer