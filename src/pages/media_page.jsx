import React from 'react';
import Layout from "../components/layout";
import Home from '../components/media/home';
import StreamingPlatforms from '../components/media/streamingPlatforms';
import MediaGallery from '../components/media/mediaGallery';
import Footer from '../components/footer';
import Messages from '../components/media/messages';

function Media() {
    return (
            <div className="bg-black font-instrument">
                <Home />
                <StreamingPlatforms />
                <Messages />
                <MediaGallery />
                <Footer />
            </div>
    );
}

export default Media;