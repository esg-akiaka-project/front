import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CommunityState {
    selectedPhoto: string | null;
    comment: string;
    posts: Array<{ photo: string | null; comment: string; nickname: string; doyakObject: string; comments: string[] }>;
    photos: string[];
    memberId: string | null;
    nickname: string;
    doyakObject: string;
    isCommentOpen: boolean;
    doyakCount: number;
    commentCount: number;
    setSelectedPhoto: (photo: string | null) => void;
    setComment: (comment: string) => void;
    setMemberId: (id: string) => void;
    setNickname: (nickname: string) => void;
    setDoyakObject: (doyakObject: string) => void;
    toggleCommentSection: () => void;
    incrementDoyakCount: () => void;
    decrementDoyakCount: () => void;
    incrementCommentCount: () => void;
    addPost: () => void;
    addPhotos: (newPhotos: string[]) => void;
    clearPhotos: () => void;
    clearTemporaryData: () => void;
    addComment: (postIndex: number, comment: string) => void;
}

const useCommunityStore = create<CommunityState>()(
    persist(
        (set) => ({
            selectedPhoto: null,
            comment: "",
            posts: [],
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
            toggleCommentSection: () => set((state) => ({ isCommentOpen: !state.isCommentOpen })),
            incrementDoyakCount: () => set((state) => ({ doyakCount: state.doyakCount + 1 })),
            decrementDoyakCount: () => set((state) => ({ doyakCount: state.doyakCount - 1 })),
            incrementCommentCount: () => set((state) => ({ commentCount: state.commentCount + 1 })),
            addPost: () => set((state) => ({
                posts: [
                    { photo: state.selectedPhoto, comment: state.comment, nickname: state.nickname, doyakObject: state.doyakObject, comments: [] },
                    ...state.posts,
                ],
                selectedPhoto: null,
                comment: "",
                nickname: "닉네임",
                doyakObject: "도약목표",
            })),
            addPhotos: (newPhotos) => set((state) => ({
                photos: [...state.photos, ...newPhotos],
            })),
            clearPhotos: () => set({ photos: [] }),
            clearTemporaryData: () => set({ selectedPhoto: null, comment: "", nickname: "닉네임", doyakObject: "도약목표" }),
            addComment: (postIndex, comment) => set((state) => {
                const updatedPosts = [...state.posts];
                updatedPosts[postIndex].comments.push(comment);
                return { posts: updatedPosts };
            }),
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