import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CommunityState {
  selectedPhoto: string | null; // 글쓰기 작성 시 선택된 사진
  comment: string; // 글쓰기 작성 시 입력된 댓글
  photos: string[]; // 업로드된 사진 목록
  memberId: string | null; // 사용자 ID
  nickname: string; // 사용자 닉네임
  doyakObject: string; // 도약 목표
  isCommentOpen: boolean; // 댓글 섹션의 열림/닫힘 상태
  doyakCount: number; // 도약 수 (게시글의 도약 클릭 수)
  commentCount: number; // 댓글 수 (게시글의 댓글 수)

  // 상태 변경 함수들
  setSelectedPhoto: (photo: string | null) => void; // 선택된 사진 설정
  setComment: (comment: string) => void; // 댓글 설정
  setMemberId: (id: string) => void; // 사용자 ID 설정
  setNickname: (nickname: string) => void; // 사용자 닉네임 설정
  setDoyakObject: (doyakObject: string) => void; // 도약 목표 설정
  toggleCommentSection: () => void; // 댓글 섹션 토글
  incrementDoyakCount: () => void; // 도약 수 증가
  decrementDoyakCount: () => void; // 도약 수 감소
  incrementCommentCount: () => void; // 댓글 수 증가
  addPhotos: (newPhotos: string[]) => void; // 새로운 사진 추가
  clearPhotos: () => void; // 사진 목록 초기화
  clearTemporaryData: () => void; // 임시 데이터 초기화
}

const useCommunityStore = create<CommunityState>()(
  persist(
    (set) => ({
      selectedPhoto: null, // 글쓰기 작성 시 선택된 사진을 유지합니다.
      comment: "", // 글쓰기 작성 시 사용자가 입력한 댓글을 유지합니다.
      photos: [], // 업로드된 사진 목록을 관리합니다.
      memberId: null, // 사용자 ID 정보
      nickname: "닉네임", // 사용자 닉네임 (프로필 관련 정보)
      doyakObject: "도약목표", // 사용자의 도약 목표 설정
      isCommentOpen: false, // 댓글 섹션 열림/닫힘 상태
      doyakCount: 0, // 도약 수, 도약 버튼 클릭 시 증가/감소
      commentCount: 0, // 댓글 수, 댓글 작성 시 증가

      // 선택된 사진을 설정
      setSelectedPhoto: (photo) => set({ selectedPhoto: photo }),

      // 댓글 내용을 설정
      setComment: (comment) => set({ comment }),

      // 사용자 ID를 설정
      setMemberId: (id) => set({ memberId: id }),

      // 사용자 닉네임을 설정
      setNickname: (nickname) => set({ nickname }),

      // 도약 목표 설정
      setDoyakObject: (doyakObject) => set({ doyakObject }),

      // 댓글 섹션 열림/닫힘 상태를 토글
      toggleCommentSection: () =>
        set((state) => ({ isCommentOpen: !state.isCommentOpen })),

      // 도약 수 증가
      incrementDoyakCount: () =>
        set((state) => ({ doyakCount: state.doyakCount + 1 })),

      // 도약 수 감소
      decrementDoyakCount: () =>
        set((state) => ({ doyakCount: state.doyakCount - 1 })),

      // 댓글 수 증가
      incrementCommentCount: () =>
        set((state) => ({ commentCount: state.commentCount + 1 })),

      // 업로드된 사진 목록에 새로운 사진 추가
      addPhotos: (newPhotos) =>
        set((state) => ({
          photos: [...state.photos, ...newPhotos],
        })),

      // 업로드된 사진 목록 초기화
      clearPhotos: () => set({ photos: [] }),

      // 글쓰기 작성 시 사용했던 임시 데이터 초기화
      clearTemporaryData: () =>
        set({
          selectedPhoto: null,
          comment: "",
          nickname: "닉네임",
          doyakObject: "도약목표",
        }),
    }),
    {
      name: "communityData", // localStorage에 저장될 이름
    }
  )
);

export default useCommunityStore;