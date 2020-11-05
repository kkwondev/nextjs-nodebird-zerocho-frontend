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
    likePostLoading:false,
    likePostDone:false,
    likePostError:null,
    unLikePostLoading:false,
    unLikePostDone:false,
    unLikePostError:null,
    removePostLoading:false,
    removePostDone:false,
    removePostError:null,
    removeCommentLoading:false,
    removeCommentDone:false,
    removeCommentError:null,
    addCommentLoading:false,
    addCommentDone:false,
    addCommentError:null,
  };


  export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
  export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
  export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

  export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
  export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
  export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

  export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
  export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
  export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

  export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
  export const ADD_POST_SUCCUESS = 'ADD_POST_SUCCUESS';
  export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

  export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
  export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
  export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

  export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
  export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
  export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

  export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
  export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
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
        case LIKE_POST_REQUEST: 
        draft.likePostLoading =true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
        case LIKE_POST_SUCCESS:
          const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
          console.debug(post)
          post.Likers.push({ id: action.data.UserId });
          draft.likePostLoading =false;
          draft.likePostDone = true;
          
        break;
        case LIKE_POST_FAILURE:
          draft.likePostLoading = false;
          draft.likePostError = action.error;
        break;
        case UNLIKE_POST_REQUEST: 
        draft.unLikePostLoading =true;
        draft.unLikePostDone = false;
        draft.unLikePostError = null;
        break;
        case UNLIKE_POST_SUCCESS: {
          const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
          post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId)
          draft.unLikePostLoading =false;
          draft.unLikePostDone = true;
        }
        break;
        case UNLIKE_POST_FAILURE:
          draft.unLikePostLoading = false;
          draft.unLikePostError = action.error;
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
          draft.hasMorePost = draft.mainPosts.length === 10;
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
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST: 
        draft.addCommentDone = false;
        draft.addCommentLoading = true;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      case REMOVE_COMMENT_REQUEST: 
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;
      case REMOVE_COMMENT_SUCCESS: {
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.id);
        console.debug(draft.mainPosts.id)
        break;
    }
      case REMOVE_COMMENT_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      
        default: 
          break;
      }
    })
  };

  export default reducer;