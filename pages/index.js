import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {END} from 'redux-saga';
import axios from 'axios';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import AppLayout from '../components/AppLayout';
import { LOAD_POST_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

import wrapper from '../store/configureStore';

const Home = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts,hasMorePost, loadPostLoading,retweetError,updatePostError } = useSelector((state) => state.post);
  const dispatch = useDispatch()
  

  useEffect(()=> {
    if(retweetError) {
      alert(retweetError)
    }
  },[retweetError])
  useEffect(()=> {
    if(updatePostError) {
        alert(updatePostError)
    }
},[updatePostError])

// useEffect(()=> {
//   dispatch({
//     type:LOAD_POST_REQUEST,
//   })
// },[])

  useEffect(()=> {
    function onScroll() {
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if(hasMorePost && !loadPostLoading) {
            const lastId = mainPosts[mainPosts.length -1]?.id;
            dispatch({
              type:LOAD_POST_REQUEST,
              lastId,
            })
          }
        }
    }
    window.addEventListener('scroll',onScroll)
    return () => {
      window.removeEventListener('scroll',onScroll)
    }
  }, [hasMorePost,loadPostLoading,mainPosts])

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((c) => {
        return (
          <PostCard key={c.id} post={c} />
        );
      })}
    </AppLayout>
  );
};

// 서버사이드 렌더링
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});
export default Home;