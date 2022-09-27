import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchPosts } from './postSlice';

const PostComp = () => {
    const allPosts = useSelector((state) => state.posts.posts);
    const statePost = useSelector((state) => state.posts)
    console.log(statePost)
    const dispatch = useDispatch()

    const doFetch = () => {
        dispatch(fetchPosts())
    }

    return (
        <div className="container">
            <h1>Post</h1>

            <button className="btn btn-primary" onClick={doFetch}>Show All Post</button>
            
            <div className="row g-4">
            {
                allPosts.map((post) => (
                    <div className="col col-6 mb-4">
                        <div className="card" key={post.id}>
                            <div className="card-body">
                                <div className="card-title">{post.title}</div>
                                <div className="card-text">{post.body}</div>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
            <div className="message">
                {statePost.isPostPending && <div><img src="https://dltqhkoxgn1gx.cloudfront.net/img/posts/6-vue-loader-animation-libraries-to-reduce-your-bounce-rate-2.png" /></div>}
                {statePost.isPostLoaded && alert('Post Loaded')}
                {statePost.errorMessage && alert(statePost.errorMessage)}
            </div>
        </div>
    )
}

export default PostComp;