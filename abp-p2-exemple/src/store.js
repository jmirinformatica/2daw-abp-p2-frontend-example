import { configureStore } from '@reduxjs/toolkit'
import  commentSlice from './posts/comments/commentSlice'


export const store = configureStore({
  reducer: {
    
    comments: commentSlice
    //comments:commentSlice,


  }
})