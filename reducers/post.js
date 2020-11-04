
import produce from 'immer';



export const initialState = {
    mainPosts: [],
    imagePaths: [],
    hasMorePost:true,
    addPostLoading:false,
    addPostDone:false,
    addPostError:null,
    loadPostLoading:false,
    loadPostDone:false,
    loadPostError:null,
    removePostLoading:false,
    removePostDone:false,
    removePostError:null,
    addCommentLoading:false,
    addCommentDone:false,
    addCommentError:null,
  };


  export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
  export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
  export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

  export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
  export const ADD_POST_SUCCUESS = 'ADD_POST_SUCCUESS';
  export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

  export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
  export const REMOVE_POST_SUCCUESS = 'REMOVE_POST_SUCCUESS';
  export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

  export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
  export const ADD_COMMENT_SUCCUESS = 'ADD_COMMENT_SUCCUESS';
  export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
  
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
})
export const addComment = (data) => ({
  type: ADD_COMNENT_REQUEST,
  data,
})

  const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
      switch (action.type) {
        case ADD_POST_REQUEST: 
        draft.addPostLoading =true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
        case ADD_POST_SUCCUESS:
          draft.addPostLoading =false;
          draft.addPostDone = true;
          draft.mainPosts.unshift(action.data);
        break;
        case ADD_POST_FAILURE:
          draft.addPostLoading = false;
          draft.addPostError = action.error;
        break;
        case LOAD_POST_REQUEST: 
          draft.loadPostLoading = true;
          draft.loadPostDone = false;
          draft.loadPostError = null;
          break;
        case LOAD_POST_SUCCESS:
          draft.loadPostLoading = false;
          draft.loadPostDone = true;
          draft.mainPosts = action.data.concat(draft.mainPosts);
          draft.hasMorePost = draft.mainPosts.length < 50;
          break;
        case LOAD_POST_FAILURE:
          draft.addPostLoading = false;
          draft.addPostError = action.error;
        break;
        case REMOVE_POST_REQUEST: 
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.addPostError = null;
        break;
      case REMOVE_POST_SUCCUESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;
        case REMOVE_POST_FAILURE:
          draft.removePostLoading = false;
          draft.removePostError = action.error;
          break
      case ADD_COMMENT_REQUEST: 
        draft.addCommentDone = false;
        draft.addCommentLoading = true;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCUESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
        // const postIndex =  state.mainPosts.findIndex((v) => v.id === action.data.postId);
        // const post = {...state.mainPosts[postIndex]}
        // post.Comments = [dummyComment(action.data.content), ...post.Comments]
        // const mainPosts = [...state.mainPosts]
        // mainPosts[postIndex] = post;
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading:false,
        //   addCommentDone:true,
        // };
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break
      
        default: 
          break;
      }
    })
  };

  export default reducer;