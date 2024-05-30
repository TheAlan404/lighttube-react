export interface InvidiousImage {
    url: string;
    width: number;
    height: number;
};

export interface InvidiousThumbnail extends InvidiousImage {
    quality: string;
};

export interface InvidiousVideo {
    type: "video";
    title: string;
    videoId: string;

    author: string;    
    authorId: string;    
    authorUrl: string;    
    authorVerified: boolean;    
    authorThumbnails: InvidiousThumbnail[];
    
    videoThumbnails: InvidiousThumbnail[];

    description: string;
    descriptionHtml: string;

    viewCount: number;
    viewCountText: string;
    lengthSeconds: number;
    likeCount: number;
    dislikeCount: number;

    published: number;
    publishedText: string;
    keywords: string[];
    
    paid: boolean;
    premium: boolean;
    isFamilyFriendly: boolean;
    allowedRegions: string[];
    genre: string;
    genreUrl: string;
    
    subCountText: string;
    isListed: boolean;
    liveNow: boolean;
    isPostLiveDvr: boolean;
    isUpcoming: boolean;
};

export interface InvidiousVideoData extends InvidiousVideo {
    dashUrl: string;
    adaptiveFormats: InvidiousAdaptiveFormat[];
    formatStreams: InvidiousFormat[];
    captions: any[];
    recommendedVideos: InvidiousVideo[];
};

export interface InvidiousAdaptiveFormat {
    itag: string;
    url: string;
    init: string;
    index: string;
    bitrate: string;
    type: string;
    clen: string;
    lmt: string;
    projectionType: string;
    fps: number;
    container: string;
    encoding: string;
    audioQuality: string;
    audioSampleRate: number;
    audioChannels: number;
}

export interface InvidiousFormat {
    url: string;
    itag: string;
    type: string;
    quality: string;
    bitrate: string;
    fps: number;
    container: string;
    encoding: string;
    resolution: string;
    qualityLabel: string;
    size: string;
}

export interface InvidiousChannel {
    type: "channel";
    author: string;    
    authorId: string;    
    authorUrl: string;    
    authorVerified: boolean;    
    authorThumbnails: InvidiousThumbnail[];
    autoGenerated: boolean;
    subCount: number;
    videoCount: number;
    description: string;
    descriptionHtml: string;
};

export interface InvidiousPlaylist {
    type: "playlist";
    title: string;
    playlistId: string;
    playlistThumbnail: string;
    author: string;    
    authorId: string;    
    authorUrl: string;    
    authorVerified: boolean;
    videoCount: number;
    videos: InvidiousPlaylistEntry[];
};

export interface InvidiousPlaylistEntry {
    title: string;
    videoId: string;
    lengthSeconds: number;
    videoThumbnails: InvidiousThumbnail[];
};

export type InvidiousRenderer = InvidiousVideo | InvidiousPlaylist | InvidiousChannel;

export interface InvidiousCommentsResponse {
    videoId: string;
    commentCount?: number;
    comments: InvidiousComment[];
    continuation: string;
};

export interface InvidiousComment {
    author: string;    
    authorId: string;    
    authorUrl: string;
    authorThumbnails: InvidiousImage[];
    isEdited: boolean;
    isPinned: boolean;
    content: string;
    contentHtml: string;
    published: number;
    publishedText: string;
    likeCount: number;
    commentId: string;
    authorIsChannelOwner: boolean;
    creatorHeart?: {
        creatorThumbnail: string;
        creatorName: string;
    },
    replies?: {
        replyCount: number;
        continuation: string;
    },
};