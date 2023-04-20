import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    messages: [],
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addNewMessage: (state, action) => {
            return {
                ...state.messages,
                ...action.payload,
            };
        },
    },
});

export const {addNewMessage} = messagesSlice.actions;

export default messagesSlice.reducer;
