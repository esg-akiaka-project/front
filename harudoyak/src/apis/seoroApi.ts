import axiosInstance from "./axiosInstance";
import { useUserStore } from "../store/useUserStore";

// 게시글 작성 API
export const createPost = async (comment: string, photoUrl: string) => { // photoUrl을 string으로 받음
  const { memberId } = useUserStore.getState();
  
  if (!memberId) {
    throw new Error("memberId가 유효하지 않습니다.");
  }  


  try {
    console.log("게시글 작성 요청\n내용:", comment, "이미지 URL:", photoUrl);
    
    // 백엔드로 게시글 데이터 전송
    const response = await axiosInstance.post(`/posts/${memberId}`, {
      shareContent: comment,
      shareImegeUrl: photoUrl,
    });
    console.log("백엔드로 게시글 데이터 전송");

    return response.data;
  } catch (error) {
    console.error("게시글 작성 실패///서로Api.ts:", error);
    throw error;
  }
};

// 게시글 목록 조회 API
export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get(`/posts/list`);
    console.log("게시글 목록 조회 성공");
    return response.data;
  } catch (error) {
    console.error("게시글 목록 조회 실패:", error);
    throw error;
  }
};

// 특정 게시글 세부 정보를 가져오는 API
export const fetchPostDetail = async (shareDoyakId: number) => {
  try {
    const response = await axiosInstance.get(`/posts/detail/${shareDoyakId}`);
    console.log("게시글 세부 정보 불러오기 성공", response);
    return response.data;
  } catch (error) {
    console.error("게시글 세부 정보 불러오기 실패:", error);
    throw error;
  }
};

// 게시글 삭제 API
export const deletePost = async (memberId: number, shareDoyakId: number) => {

  if (!memberId) {
    console.error("memberId가 없습니다. 로그인을 확인해주세요.");
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await axiosInstance.delete(
      `/posts/${memberId}/${shareDoyakId}`
    );
    console.log("게시글 삭제 성공");
    return response.data;
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    throw error;
  }
};

// 게시글 수정 API
export const editPost = async (
  memberId: number, shareDoyakId: number, shareContent: string) => {
  try {
    const response = await axiosInstance.put(`/posts/${memberId}/${shareDoyakId}`, {
      shareDoyakId: shareDoyakId,
      shareContent: shareContent,
    });
    console.log("게시글 수정 성공");
    return response.data;
  } catch (error) {
    console.error("게시글 수정 실패:", error);
    throw error;
  }
};

// 도약하기 추가 API
export const addDoyak = async (memberId: number, shareDoyakId: number) => {
  try {
    const response = await axiosInstance.post(`/posts/doyak/${memberId}/${shareDoyakId}`);
    console.log("도약하기 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("도약하기 실패:", error);
    throw error;
  }
};

// 댓글 작성 API
export const createComment = async (shareDoyakId: number, commentContent: string) => {
  const { memberId } = useUserStore.getState();
  if (!memberId) { 
    console.error("memberId가 없습니다. 로그인을 확인해주세요.");
    throw new Error("로그인이 필요합니다.");
  }
  try {
    const response = await axiosInstance.post(`/posts/comments/${memberId}/${shareDoyakId}`, {
      commentContent,
    });
    console.log("댓글 작성 성공");
    return response.data;
  } catch (error) {
    console.error("댓글 작성 실패:", error);
    throw error;
  }
};

// 답글 작성 API
export const createCommentchild= async (shareDoyakId: number, commentId: number, commentChildContent: string) => {
  const { memberId } = useUserStore.getState();
  if (!memberId) { 
    console.error("memberId가 없습니다. 로그인을 확인해주세요.");
    throw new Error("로그인이 필요합니다.");
  }
  try {
    const response = await axiosInstance.post(`/posts/comments/replys/${memberId}/${shareDoyakId}/${commentId}`, {
      commentContent: commentChildContent,
    });
    console.log("답글 작성 성공 seoroApi");
    return response.data;
  } catch (error) {
    console.error("답글 작성 실패:", error);
    throw error;
  }
};




// 댓글 목록 조회 API
export const fetchComments = async (shareDoyakId: number) => {
  try {
    const response = await axiosInstance.get(`/posts/comments/list/${shareDoyakId}`);
    console.log("댓글 목록 조회 성공");
    return response.data;
  } catch (error) {
    console.error("댓글 목록 조회 실패:", error);
    throw error;
  }
};


