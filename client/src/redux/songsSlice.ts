import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song, SongState } from "../types";
import toast from "react-hot-toast";



const initialState: SongState = {
  songs: [],
  loading: false,
  error: false,
  errorMsg: null,
};

const SongSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    getSongsStart: (state) => {
      state.loading = true;
      state.errorMsg = null;
    },
    getSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
      state.songs = action.payload;
    },
    getSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },
    addSongStart: (state, action: PayloadAction<Song>) => {
      state.loading = true;
      state.errorMsg = null;
      state.error = false;
    },
    addSongSuccess: (state, action: PayloadAction<Song>) => {
      if (!Array.isArray(state.songs)) {
        state.songs = [];
      }
      state.loading = false;
      state.songs.push(action.payload);
      state.error = false;
      toast.success("New Song Added");

    },
    addSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMsg = action.payload;
      state.error = true;
      toast.error(`${action.payload}`);
    },
    updateSongStart: (state, action: PayloadAction<Song>) => {
      state.loading = true;
      state.errorMsg = null;
      state.error = false;

    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      const index = state.songs.findIndex((song) => song._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.error = false;
      toast.success("Song Updated");
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMsg = action.payload;
      state.error = true;
      toast.error(`${action.payload}`);
    },
    deleteSongStart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.errorMsg = null;
      state.error = false;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;

      state.songs = state.songs.filter((song) => song._id !== action.payload);
      state.error = false;
      toast.success(`Deleted ${action.payload}`);
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMsg = action.payload;
      state.error = true;
      toast.error(`${action.payload}`);
    },

  },
});

export const {
  getSongsStart,
  getSongsSuccess,
  getSongsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
} = SongSlice.actions;
export default SongSlice.reducer;