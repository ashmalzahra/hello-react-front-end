import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/greetings';

const initialState = {
  greeting: '',
  ifSuceed: false,
  ifLoading: false,
  errors: null,
};

export const fetchGreeting = createAsyncThunk(
  'greeting/fetchGreeting',
  async () => {
    try {
      const response = await axios.get(url);
      return response.data.greeting;
    } catch (e) {
      return e.message;
    }
  },
);

const greetingSlice = createSlice({
  name: 'greeting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGreeting.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchGreeting.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        ifSuceed: true,
        greeting: action.payload,
      }))
      .addCase(fetchGreeting.rejected, (state) => ({
        ...state,
        isLoading: false,
      }));
  },
});

export default greetingSlice.reducer;
