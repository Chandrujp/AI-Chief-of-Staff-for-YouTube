// YouTube Data API v3 Service
// Handles YouTube channel data fetching and analysis

export interface YouTubeChannelData {
  channelId: string;
  channelName: string;
  subscriberCount: number;
  totalViews: number;
  totalVideos: number;
  videos: YouTubeVideo[];
}

export interface YouTubeVideo {
  videoId: string;
  title: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  duration: string;
}

const YOUTUBE_API_KEY = import.meta.env.YouTube_API_Key;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export async function getChannelIdFromHandle(handle: string): Promise<string> {
  try {
    const cleanHandle = handle.replace('@', '');
    const response = await fetch(
      `${YOUTUBE_API_BASE}/search?part=snippet&type=channel&q=${encodeURIComponent(cleanHandle)}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch channel');
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return data.items[0].id.channelId;
    }
    throw new Error('Channel not found');
  } catch (error) {
    console.error('Error getting channel ID:', error);
    throw error;
  }
}

export async function getChannelData(channelId: string): Promise<YouTubeChannelData> {
  try {
    const channelResponse = await fetch(
      `${YOUTUBE_API_BASE}/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!channelResponse.ok) throw new Error('Failed to fetch channel data');
    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found');
    }
    
    const channel = channelData.items[0];
    const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;
    
    const videosResponse = await fetch(
      `${YOUTUBE_API_BASE}/playlistItems?part=contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${YOUTUBE_API_KEY}`
    );
    
    if (!videosResponse.ok) throw new Error('Failed to fetch videos');
    const videosData = await videosResponse.json();
    const videoIds = videosData.items.map((item: any) => item.contentDetails.videoId);
    
    const videoStatsResponse = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(',')}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!videoStatsResponse.ok) throw new Error('Failed to fetch video stats');
    const videoStats = await videoStatsResponse.json();
    
    const videos: YouTubeVideo[] = videoStats.items.map((video: any) => ({
      videoId: video.id,
      title: video.snippet.title,
      publishedAt: video.snippet.publishedAt,
      viewCount: parseInt(video.statistics.viewCount || '0'),
      likeCount: parseInt(video.statistics.likeCount || '0'),
      commentCount: parseInt(video.statistics.commentCount || '0'),
      duration: video.contentDetails.duration,
    }));
    
    return {
      channelId,
      channelName: channel.snippet.title,
      subscriberCount: parseInt(channel.statistics.subscriberCount || '0'),
      totalViews: parseInt(channel.statistics.viewCount || '0'),
      totalVideos: parseInt(channel.statistics.videoCount || '0'),
      videos,
    };
  } catch (error) {
    console.error('Error getting channel data:', error);
    throw error;
  }
}
