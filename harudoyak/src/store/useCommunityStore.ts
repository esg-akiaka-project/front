// store/useCommunityStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CommunityState {
    selectedPhoto: string | null;
    comment: string;
    posts: Array<{ photo: string | null; comment: string }>;
    photos: string[]; // PhotoGrid의 사진들을 관리할 배열
    setSelectedPhoto: (photo: string | null) => void;
    setComment: (comment: string) => void;
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
            setSelectedPhoto: (photo) => set({ selectedPhoto: photo }),
            setComment: (comment) => set({ comment }),
            addPost: () => set((state) => ({
                posts: [
                    { photo: state.selectedPhoto, comment: state.comment },
                    ...state.posts,
                ],
                selectedPhoto: null,
                comment: "",
            })),
            addPhotos: (newPhotos) => set((state) => ({
                photos: [...state.photos, ...newPhotos],
            })),
            clearPhotos: () => set({ photos: [] }),
            clearTemporaryData: () => set({ selectedPhoto: null, comment: "" }),
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
