import { configureStore, createSlice } from "@reduxjs/toolkit";
const userInitialState = {
  id: "",
  email: "",
  username: "",
};
// 사용자 정보 슬라이스 생성
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default store;
