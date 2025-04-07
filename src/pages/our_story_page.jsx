import React from 'react'
import Layout from '../components/layout'
import Home from '../components/our-story/home'
import Rooted from '../components/our-story/rooted'
import FounderStory from '../components/our-story/founder-story'
import Missionvision from '../components/our-story/missio&vision'
import Branches from '../components/our-story/branches'
import Announce from '../components/home/announcements'
import Footer from '../components/footer'


const our_story_page = () => {
  return (
    <div>
      <div className=" bg-black overflow-x-hidden font-instrument">
        <Home/>
        <Rooted/>
        <FounderStory/>
        <Missionvision/>
        <Branches/>
        <Announce/>
        <Footer/>
      </div>
    </div>
  )
}

export default our_story_page
