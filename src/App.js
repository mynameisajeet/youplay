import React, { useState } from 'react';
import axios from 'axios';
import './YouPlay.css';

const YouPlay = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const searchVideos = async () => {
    const API_KEY = 'AIzaSyC2XSuMa9yRKxlo_faejCoRL6cKtGZ8RCE'; // Your YouTube API key
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: 'snippet',
        maxResults: 10,
        q: searchTerm,
        type: 'video',
        videoCategoryId: '10', // Category ID for music
        key: API_KEY,
      },
    });

    setVideos(response.data.items);
    setSelectedVideo(null); // Reset selected video when new search is performed
  };

  const playVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  return (
    <div className="container">
      <h1>YouPlay Music Search</h1>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          placeholder="Search for music..."
        />
        <button onClick={searchVideos}>Search</button>
      </div>

      {/* Song Result Cards */}
      <div className="card">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-card">
            <h3 className="video-title">{video.snippet.title}</h3>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            <button onClick={() => playVideo(video.id.videoId)}>Play</button>
          </div>
        ))}
      </div>

      {/* Player for Selected Video */}
      {selectedVideo && (
        <div className="video-player">
          <h2>Now Playing:</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${selectedVideo}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video Player"
          />
        </div>
      )}
    </div>
  );
};

export default YouPlay;
