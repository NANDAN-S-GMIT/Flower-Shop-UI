import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (product, thunkAPI) => {
    await new Promise(resolve => setTimeout(resolve, 100)); 
    return product;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItem = state.items.find(item => item.id === newItem.id);

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          state.items.push(newItem);
        }

        state.loading = false;
      })
      .addCase(addToCartAsync.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to add item.';
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
