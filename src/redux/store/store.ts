import { configureStore } from "@reduxjs/toolkit";
import InfoSplice from "../slices/InfoSlice";
import LoadingSlice from "../slices/LoadingSlice";
import UsersSlice from "../slices/UsersSlice";
import BookingSlice from "../slices/BookingSlice";

export const store = configureStore({
    reducer:{
        info:InfoSplice,
        loading:LoadingSlice,
        userInfo:UsersSlice,
        orderInfo:BookingSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch