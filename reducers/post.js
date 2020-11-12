import produce from 'immer';



export const initialState = {
    mainPosts: [],
    imagePaths: [],
    singlePost:null,
    hasMorePost:true,
    addPostLoading:false,
    addPostDone:false,
    addPostError:null,
    updatePostLoading:false,
    updatePostDone:false,
    updatePostError:null,
    loadPostLoading:false,
    loadPostDone:false,
    loadPostError:null,
    likePostsLoading:false,
    likePostsDone:false,
    likePostsError:null,
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
    uploadImagesLoading:false,
    uploadImagesDone:false,
    uploadImagesError:null,
    retweetLoading:false,
    retweetDone:true,
    retweetError:null,
  };

  export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
  export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
  export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

  export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
  export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
  export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

  export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
  export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
  export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

  export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
  export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
  export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

  export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
  export const ADD_POST_SUCCUESS = 'ADD_POST_SUCCUESS';
  export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

  export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
  export const UPDATE_POST_SUCCUESS = 'UPDATE_POST_SUCCUESS';
  export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

  export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
  export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
  export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

  export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
  export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
  export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

  export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
  export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
  export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

  export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
  export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
  export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

  export const REMOVE_IMAGE = 'REMOVE_IMAGE';

  export const RETWEET_REQUEST = 'RETWWET_REQUEST';
  export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
  export const RETWEET_FAILURE = 'RETWEET_FAILURE';
  
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
        case REMOVE_IMAGE :
          draft.imagePaths = draft.imagePaths.filter((v,i) => i !== action.data);
          break;
        case RETWEET_REQUEST: 
        draft.retweetLoading =true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
        case RETWEET_SUCCESS:
          draft.retweetLoading =false;
          draft.retweetDone = true;
          draft.mainPosts.unshift(action.data);
        break;
        case RETWEET_FAILURE:
          draft.retweetLoading = false;
          draft.retweetError = action.error;
        break;
        case ADD_POST_REQUEST: 
        draft.addPostLoading =true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
        case ADD_POST_SUCCUESS:
          draft.addPostLoading =false;
          draft.addPostDone = true;
          draft.mainPosts.unshift(action.data);
         draft.imagePaths = [];
        break;
        case ADD_POST_FAILURE:
          draft.addPostLoading = false;
          draft.addPostError = action.error;
        break;
        case UPDATE_POST_REQUEST: 
        draft.updatePostLoading =true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;
        case UPDATE_POST_SUCCUESS: {
          draft.updatePostLoading =false;
          draft.updatePostDone = true;
          const post = draft.mainPosts.find((v) => v.id === action.data.postId);
          post.content = action.data.content;
        break;
        }
        case UPDATE_POST_FAILURE:
          draft.updatePostLoading = false;
          draft.updatePostError = action.error;
        break;
        case LIKE_POST_REQUEST: 
        draft.likePostLoading =true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
        case LIKE_POST_SUCCESS:
          const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
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
        case LOAD_POSTS_REQUEST: 
          draft.loadPostsLoading = true;
          draft.loadPostsDone = false;
          draft.loadPostsError = null;
          break;
        case LOAD_POSTS_SUCCESS:
          draft.loadPostsLoading = false;
          draft.loadPostsDone = true;
          draft.mainPosts = draft.mainPosts.concat(action.data);
          draft.hasMorePost = draft.mainPosts.length === 10;
          break;
        case LOAD_POSTS_FAILURE:
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
          draft.singlePost = action.data;
          break;
        case LOAD_POST_FAILURE:
          draft.addPostsLoading = false;
          draft.addPostsError = action.error;
        break;
        case UPLOAD_IMAGES_REQUEST: 
          draft.uploadImagesLoading = true;
          draft.uploadImagesDone = false;
          draft.uploadImagesError = null;
          break;
        case UPLOAD_IMAGES_SUCCESS:
          draft.uploadImagesLoading = false;
          draft.uploadImagesDone = true;
          draft.imagePaths = action.data;
          break;
        case UPLOAD_IMAGES_FAILURE:
          draft.uploadImagesLoading = false;
          draft.uploadImagesError = action.error;
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
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments = post.Comments.filter((v) => v.id !== action.data.commentId)
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
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