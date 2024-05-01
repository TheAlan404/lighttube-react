export type VideoFormatType = "basic" | "adaptive" | "dash" | "hls";

export interface VideoFormat {
    type: VideoFormatType;
    id: string;
    
    itag: string;
    url: string;
    mimeType: string;
    bitrate: number;
    fps: number;
    width: number;
    height: number;
}