import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import AppLayout from '../components/AppLayout';
import { LOAD_POST_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';

const Home = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts,hasMorePost, loadPostLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch({
      type:LOAD_USER_REQUEST,
    })
  },[])
  useEffect(()=> {
    dispatch({
      type:LOAD_POST_REQUEST,
    })
  },[])
  useEffect(()=> {
    function onScroll() {
      console.debug(loadPostLoading)
      console.debug(window.scrollY,document.documentElement.clientHeight, 
        document.documentElement.scrollHeight )
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if(hasMorePost && !loadPostLoading) {
            dispatch({
              type:LOAD_POST_REQUEST,
            })
          }
        }
    }
    window.addEventListener('scroll',onScroll)
    return () => {
      window.removeEventListener('scroll',onScroll)
    }
  }, [hasMorePost,loadPostLoading])

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

export default Home;