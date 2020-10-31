import shortId from 'shortid';
import produce from 'immer';


export const initialState = {
    mainPosts: [{
      id: shortId.generate(),
      User: {
        id: 1,
        nickname: 'kkwon',
      },
      content: '첫 번째 게시글 #해시태그 #경원이',
      Images: [{
        id:shortId.generate(),
        src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
      }, {
        id:shortId.generate(),
        src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
      }, 
      {
        id:shortId.generate(),
        src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
      }
    ],
      Comments: [{
        id:shortId.generate(),
        User: {
          id:shortId.generate(),
          nickname: 'nero',
        },
        content: '우와 개정판이 나왔군요~',
      }, {
        id:shortId.generate(),
        User: {
          id:shortId.generate(),
          nickname: 'hero',
        },
        content: '얼른 사고싶어요~',
      }]
    }],
    imagePaths: [],
    addPostLoading:false,
    addPostDone:false,
    addPostError:null,
    removePostLoading:false,
    removePostDone:false,
    removePostError:null,
    addCommentLoading:false,
    addCommentDone:false,
    addCommentError:null,
  };
  
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
  
  const dummyPost = (data) => ({
    id: shortId.generate(),
    content: data.content,
    User: {
      id: 1,
      nickname: 'kkwon',
    },
    Images: [],
    Comments: [],
  });
  const dummyComment = (data) => ({
    id: data.id,
    content: data.content,
    User: {
      id: shortId.generate(),
      nickname: 'kkwon',
    },
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
          draft.mainPosts.unshift(dummyPost(action.data));
        break;
        case ADD_POST_FAILURE:
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
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data));
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