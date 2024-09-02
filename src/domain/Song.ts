import type { ThreadRender } from "./Thread";
import type { ValidationResult } from "./Validation";

export interface SongComment {
    identifier: string;
    songIdentifier: string;
    parentIdentifier: string | null;
    createdBy: string;
    visibilityStatus: number;
    contents: string;
    approvedBy: string | null;
    createdAt: Date;
    lastEditedAt: Date | undefined;
}

export interface Song {
    identifier: string;
    displayName: string;
    musicKey: string | null;
    musicTuning: string | null;
    musicCreationDate: string | null;
    albumName: string | null;
    albumInfoLink: string | null;
    createdBy: string;
    visibilityStatus: number;
    approvedBy: string | null;
    createdAt: Date;
    lastEditedAt: Date | undefined;
    artworks: Record<string, SongArtwork>;
    comments: [ThreadRender<SongComment>];
    opinions: Record<string, SongOpinion>;
    contents: Record<string, SongContents>;
    spotifyUrl: string | null;
    youtubeUrl: string | null;
    soundcloudUrl: string | null;
    wikipediaUrl: string | null;
    artists: Record<string, string>;
}

export interface SongOpinion {
    identifier: string;
    songIdentifier: string;
    createdBy: string;
    isLike: boolean;
    isDislike: boolean;
    createdAt: Date;
    lastEditedAt: Date | undefined;
}

export interface SongArtwork {
    identifier: string;
    songIdentifier: string;
    createdBy: string;
    visibilityStatus: number;
    approvedBy: string | null;
    contentType: string;
    contentUrl: string;
    contentCaption: string | null;
    createdAt: Date;
    lastEditedAt: Date | undefined;
    orderValue: number;
}

export interface SongContents {
    identifier: string;
    versionName: string;
    songIdentifier: string;
    instrumentType: string;
    asciiLegend: string | null;
    asciiContents: string | null;
    pdfContents: string | null;
    guitarproContents: string | null;
    createdAt: Date;
    lastEditedAt: Date | undefined;
}

export interface InsertSongsRequestItem {
    displayName: string;
    spotifyUrl: string | null;
    youtubeUrl: string | null;
    soundcloudUrl: string | null;
    wikipediaUrl: string | null;
    musicKey: string | null;
    musicTuning: string | null;
    musicCreationDate: string | null;
    albumName: string | null;
    albumInfoLink: string | null;
}

export interface InsertSongsRequest {
    songs: InsertSongsRequestItem[];
}

export interface InsertSongArtworksResponse {
    songArtworks: Record<string, SongArtwork>;
    sortOrder: [string];
    validationResults: Record<string, ValidationResult>;
}

export interface InsertSongArtworksRequestItem {
    songIdentifier: string;
    contentUrl: string;
    contentCaption: string | null;
    orderValue: number;
}

export interface InsertSongArtworksRequest {
    songArtworks: InsertSongArtworksRequestItem[];
}

export interface InsertSongCommentsRequestItem {
    songIdentifier: string;
    parentIdentifier: string | null;
    contents: string;
}

export interface InsertSongCommentsRequest {
    songComments: InsertSongCommentsRequestItem[];
}

export interface UpdateSongArtistsRequestItem {
    songIdentifier: string;
    artistIdentifier: string;
}

export interface UpdateSongArtistsRequest {
    songArtists: UpdateSongArtistsRequestItem[];
}

export interface SongDelta {
    displayName: string | null;
    musicKey: string | null;
    musicTuning: string | null;
    musicCreationDate: string | null;
    albumName: string | null;
    albumInfoLink: string | null;
    spotifyUrl: string | null;
    youtubeUrl: string | null;
    soundcloudUrl: string | null;
    wikipediaUrl: string | null;
}

export interface EditSong extends InsertSongsRequestItem {
    identifier: string;
}

export interface InsertSongContentsItem {
    songIdentifier: string;
    versionName: string;
    instrumentType: string | null;
    asciiLegend: string | null;
    asciiContents: string | null;
    pdfContents: string | null;
    guitarProContents: string | null;
}

export interface InsertSongContentsRequest {
    songContents: [InsertSongContentsItem];
}

export interface EditSongContentsItem extends InsertSongContentsItem {
    identifier: String;
}

export interface EditSongRequest {
    songDeltas: [EditSong];
}

export interface EditSongContentsRequest {
    songContentDeltas: [EditSongContentsItem];
}
