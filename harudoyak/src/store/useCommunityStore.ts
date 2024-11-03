// store/useCommunityStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CommunityState {
    selectedPhoto: string | null;
    comment: string;
    posts: Array<{ photo: string | null; comment: string; nickname: string; doyakObject: string }>;
    photos: string[];
    memberId: string | null;
    nickname: string;
    doyakObject: string;
    setSelectedPhoto: (photo: string | null) => void;
    setComment: (comment: string) => void;
    setMemberId: (id: string) => void;
    setNickname: (nickname: string) => void;
    setDoyakObject: (doyakObject: string) => void;
    addPost: () => void;
    addPhotos: (newPhotos: string[]) => void;
    clearPhotos: () => void;
    clearTemporaryData: () => void;
}

const useCommunityStore = create<CommunityState>()(
    persist(
        (set) => ({
            selectedPhoto: null,
            comment: "",
            posts: [],
            photos: [],
            memberId: null,
            nickname: "사용자의 닉네임", // 예시 텍스트
            doyakObject: "사용자의 도약목표", // 예시 텍스트
            setSelectedPhoto: (photo) => set({ selectedPhoto: photo }),
            setComment: (comment) => set({ comment }),
            setMemberId: (id) => set({ memberId: id }),
            setNickname: (nickname) => set({ nickname }),
            setDoyakObject: (doyakObject) => set({ doyakObject }),
            addPost: () => set((state) => ({
                posts: [
                    { photo: state.selectedPhoto, comment: state.comment, nickname: state.nickname, doyakObject: state.doyakObject },
                    ...state.posts,
                ],
                selectedPhoto: null,
                comment: "",
                nickname: "사용자의 닉네임", // 초기화
                doyakObject: "사용자의 도약목표", // 초기화
            })),
            addPhotos: (newPhotos) => set((state) => ({
                photos: [...state.photos, ...newPhotos],
            })),
            clearPhotos: () => set({ photos: [] }),
            clearTemporaryData: () => set({ selectedPhoto: null, comment: "", nickname: "사용자의 닉네임", doyakObject: "사용자의 도약목표" }),
        }),
        {
            name: 'communityData',
            partialize: (state) => ({
                posts: state.posts,
            }),
        }
    )
);

export default useCommunityStore;
