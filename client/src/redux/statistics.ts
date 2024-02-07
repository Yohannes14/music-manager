import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStatistics } from "../types";



const initialState: IStatistics = {
    totalSongs: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalGenres: 0,
    genresStatistics: [],
    artistsStatistics: [],
    albumsStatistics: [],
    loading: false,
    error: null
};

const StatSlice = createSlice({
    name: "stat",
    initialState,
    reducers: {
        getStatisticsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getStatisticsSuccess: (state, action: PayloadAction<IStatistics>) => {
            state.loading = false;
            state.totalSongs = action.payload.totalSongs;
            state.totalArtists = action.payload.totalArtists;
            state.totalAlbums = action.payload.totalAlbums;
            state.totalGenres = action.payload.totalGenres;
            state.albumsStatistics = action.payload.albumsStatistics;
            state.artistsStatistics = action.payload.artistsStatistics;
            state.genresStatistics = action.payload.genresStatistics;

        },
        getStatisticsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export const {
    getStatisticsStart,
    getStatisticsSuccess,
    getStatisticsFailure
} = StatSlice.actions;
export default StatSlice.reducer;