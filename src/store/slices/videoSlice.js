import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    videos: [],
    nextId: 1,
};

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        addVideo: (state, action) => {
            if (!Array.isArray(state.videos)) {
                state.videos = [];
            }
            if (typeof state.nextId !== 'number') {
                state.nextId = 1;
            }

            const newVideo = {
                id: state.nextId,
                ...action.payload,
                createdAt: new Date().toISOString(),
            };

            state.videos.push(newVideo);
            state.nextId = state.nextId + 1;
        },
        deleteVideo: (state, action) => {
            if (Array.isArray(state.videos)) {
                const index = state.videos.findIndex(
                    (video) => video.id === action.payload
                );
                if (index > -1) {
                    state.videos.splice(index, 1);
                }
            }
        },

    },
});

export const { addVideo, deleteVideo } = videoSlice.actions;
export default videoSlice.reducer;