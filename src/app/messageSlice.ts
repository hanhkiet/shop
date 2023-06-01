import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MessagePayload, MessageState } from './types';

const initialState: MessageState = {
  message: null,
  status: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    clearError: state => {
      state.message = null;
      state.status = null;
    },
  },
});

const popUpMessage = createAsyncThunk(
  'message/pop-up',
  async (payload: MessagePayload, { dispatch }) => {
    dispatch(messageSlice.actions.setError(payload));

    setTimeout(() => {
      dispatch(messageSlice.actions.clearError());
    }, 3000);
  },
);

export { popUpMessage };
export default messageSlice.reducer;
