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
      selectedPhoto: null,
      comment: "",
      photos: [],
      memberId: null,
      nickname: "닉네임",
      doyakObject: "도약목표",
      isCommentOpen: false,
      doyakCount: 0,
      commentCount: 0,

      setSelectedPhoto: (photo) => set({ selectedPhoto: photo }),
      setComment: (comment) => set({ comment }),
      setMemberId: (id) => set({ memberId: id }),
      setNickname: (nickname) => set({ nickname }),
      setDoyakObject: (doyakObject) => set({ doyakObject }),
      toggleCommentSection: () =>
        set((state) => ({ isCommentOpen: !state.isCommentOpen })),
      incrementDoyakCount: () =>
        set((state) => ({ doyakCount: state.doyakCount + 1 })),
      decrementDoyakCount: () =>
        set((state) => ({ doyakCount: state.doyakCount - 1 })),
      incrementCommentCount: () =>
        set((state) => ({ commentCount: state.commentCount + 1 })),
      addPhotos: (newPhotos) =>
        set((state) => {
          const updatedPhotos = [...newPhotos, ...state.photos];
          if (updatedPhotos.length > 20) {
            return { photos: updatedPhotos.slice(0, 21) }; // 최신 100개 사진만 유지
          }
          return { photos: updatedPhotos };
        }),
      clearPhotos: () => set({ photos: [] }),
      clearTemporaryData: () =>
        set({
          selectedPhoto: null,
          comment: "",
          nickname: "닉네임",
          doyakObject: "도약목표",
        }),
    }),
    {
      name: "communityData",
      version: 1, // 버전 추가
    }
  )
);





export default useCommunityStore;