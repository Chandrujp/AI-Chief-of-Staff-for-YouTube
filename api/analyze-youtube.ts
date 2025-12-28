import { VercelRequest, VercelResponse } from '@vercel/node';

const YOUTUBE_API_KEY = process.env.YouTube_API_Key;
const GEMINI_API_KEY = process.env.AI_Chief_of_Staff_YouTube;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { channelHandle } = req.body;

    if (!channelHandle || !YOUTUBE_API_KEY) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Get channel ID from handle
    const cleanHandle = channelHandle.replace('@', '');
    const searchResponse = await fetch(
      `${YOUTUBE_API_BASE}/search?part=snippet&type=channel&q=${encodeURIComponent(cleanHandle)}&key=${YOUTUBE_API_KEY}`
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to fetch channel');
    }

    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    const channelId = searchData.items[0].id.channelId;

    // Get channel details
    const channelResponse = await fetch(
      `${YOUTUBE_API_BASE}/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`
    );

    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel data');
    }

    const channelData = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    const channel = channelData.items[0];
    const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;

    // Get videos
    const videosResponse = await fetch(
      `${YOUTUBE_API_BASE}/playlistItems?part=contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${YOUTUBE_API_KEY}`
    );

    if (!videosResponse.ok) {
      throw new Error('Failed to fetch videos');
    }

    const videosData = await videosResponse.json();
    const videoIds = videosData.items.map((item: any) => item.contentDetails.videoId);

    // Get video statistics
    const videoStatsResponse = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(',')}&key=${YOUTUBE_API_KEY}`
    );

    if (!videoStatsResponse.ok) {
      throw new Error('Failed to fetch video stats');
    }

    const videoStats = await videoStatsResponse.json();

    const videos = videoStats.items.map((video: any) => ({
      videoId: video.id,
      title: video.snippet.title,
      publishedAt: video.snippet.publishedAt,
      viewCount: parseInt(video.statistics.viewCount || '0'),
      likeCount: parseInt(video.statistics.likeCount || '0'),
      commentCount: parseInt(video.statistics.commentCount || '0'),
      duration: video.contentDetails.duration,
    }));

    const analysisResult = {
      channelId,
      channelName: channel.snippet.title,
      subscriberCount: parseInt(channel.statistics.subscriberCount || '0'),
      totalViews: parseInt(channel.statistics.viewCount || '0'),
      totalVideos: parseInt(channel.statistics.videoCount || '0'),
      videos,
      burnoutRisk: 'MEDIUM' as const,
    };

    return res.status(200).json(analysisResult);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
