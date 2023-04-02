import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import { doc, getFirestore, getDoc, DocumentData } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

interface User {
  data: { name: string; email: string };
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: User = {
  data: { name: '', email: '' },
  loading: 'idle',
  error: null,
};

export const getUser = createAsyncThunk('user/getUser', async () => {
  const auth = getAuth();
  const userDocRef = doc(getFirestore(), 'users', auth.currentUser!.uid);
  try {
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data() as { name: string; email: string };
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error(error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.data = action.payload!;
        state.loading = 'succeeded';
      }
    });
    builder.addCase(getUser.rejected, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'failed';
        state.error = 'Error occured';
      }
    });
  },
});

export const {} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.data;

export default userSlice.reducer;
