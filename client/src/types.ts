
export interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
}


export interface GenreStatistic {
    _id: string;
    count: number;
}

export interface ArtistStatistic {
    _id: string;
    songsCount: number;
    albumsCount: string[];
}

export interface AlbumStatistic {
    _id: string;
    count: number;
}

export interface SongState {
    songs: Song[];
    loading: boolean;
    error: boolean;
    errorMsg: string | null
}
export interface IStatistics {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalGenres: number;
    genresStatistics: GenreStatistic[];
    artistsStatistics: ArtistStatistic[];
    albumsStatistics: AlbumStatistic[];
    loading: boolean;
    error: string | null;
}