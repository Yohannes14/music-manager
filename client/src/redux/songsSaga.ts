
import { Effect, all, call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../types";
import axios from "axios";
import { API_BASE_URL } from "../utils/baseUrl";
import {
    getSongsSuccess,
    getSongsFailure,
    getSongsStart,
    addSongStart,
    updateSongStart,
    deleteSongStart,
    addSongSuccess,
    addSongFailure,
    updateSongSuccess,
    updateSongFailure,
    deleteSongSuccess,
    deleteSongFailure,
} from "./songsSlice";
import { getStatisticsFailure, getStatisticsStart, getStatisticsSuccess } from "./statistics";




function* getSongs(): Generator<Effect, void, any> {
    try {
        const response = yield call(axios.get, `${API_BASE_URL}/songs`);
        yield put(getSongsSuccess(response?.data?.songs));
    } catch (error: any) {
        if (error?.response) {
            const { data } = error.response;
            yield put(getSongsFailure(data?.error))
        } else {
            yield put(getSongsFailure('Unexpected error occurred'));
        }

    }
}

function* addSong(action: PayloadAction<Song>): Generator<Effect, void, any> {
    try {
        yield call(axios.post, `${API_BASE_URL}/songs`, action.payload);
        yield put(addSongSuccess(action.payload))

    } catch (error: any) {
        if (error?.response) {
            const { data } = error.response;
            yield put(addSongFailure(data?.error))
        } else {
            yield put(addSongFailure('Unexpected error occurred'));
        }

    }
}

function* updateSong(action: PayloadAction<Song>): Generator<Effect, void, any> {
    try {

        const response = yield call(axios.put, `${API_BASE_URL}/songs/${action.payload._id}`, action.payload);
        yield put(updateSongSuccess(action.payload))

    } catch (error: any) {
        if (error?.response) {
            const { data } = error.response;
            yield put(updateSongFailure(data?.error))
        } else {
            yield put(updateSongFailure('Unexpected error occurred'));
        }
    }
}

function* deleteSong(action: PayloadAction<string>): Generator<Effect, void, any> {
    try {
        yield call(axios.delete, `${API_BASE_URL}/songs/${action.payload}`);
        yield put(deleteSongSuccess(action.payload))

    } catch (error: any) {
        if (error?.response) {
            const { data } = error.response;
            yield put(deleteSongFailure(data?.error))
        } else {
            yield put(deleteSongFailure('Unexpected error occurred'));
        }
    }
}

function* getStatistics(): Generator<Effect, void, any> {
    try {
        const response = yield call(axios.get, `${API_BASE_URL}/statistics`);
        yield put(getStatisticsSuccess(response.data));
    } catch (error: any) {
        if (error?.response) {
            const { data } = error.response;
            yield put(getStatisticsFailure(data?.error))
        } else {
            yield put(getStatisticsFailure('Unexpected error occurred'));
        }

    }

}

export default function* rootSaga() {
    yield all([
        takeEvery(getSongsStart.type, getSongs),
        takeEvery(addSongStart.type, addSong),
        takeEvery(updateSongStart.type, updateSong),
        takeEvery(deleteSongStart.type, deleteSong),
        takeEvery(getStatisticsStart.type, getStatistics)
    ]);
}