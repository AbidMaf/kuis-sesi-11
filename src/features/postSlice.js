import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    isPostPending: false,
    isPostLoaded: false,
    errorMessage: '',
    posts: []
}

function getPostAPI() {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            axios.get(POSTS_URL)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }, 1000);
    })   
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await getPostAPI();
        console.log('response ', response.data)
        return response.data;
    } catch(err) {
        throw(err)
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.isPostPending = true
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts.push(...action.payload)
            state.isPostPending = false
            state.isPostLoaded = true
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.isPostPending = false
            state.isPostLoaded = false
            state.errorMessage = action.error.message
        })
    }
})

export default postSlice.reducer