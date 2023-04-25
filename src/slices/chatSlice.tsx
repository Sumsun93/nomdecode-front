import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState = {
    messages: [],
    currentUsername: '',
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // todo typer l'action ? Objet de deux strings
        addNewMessage: (state, action) => {
            return {
                ...state.messages,
                ...action.payload,
            };
        },
        setCurrentUsername: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                currentUsername: action.payload,
            };
        },
    },
});

export const {addNewMessage, setCurrentUsername} = chatSlice.actions;

export default chatSlice.reducer;
