import '../../src/App.css';
import Home from '../components/home/home'
import Subscribe from '../components/home/subscribe'
import Belief from '../components/home/belief'
import Partner from '../components/home/partner';
import Testimony from '../components/home/testimony';
import Events from '../components/home/events'; 
import Podcast from '../components/home/podcast-home'; 
import Seat from '../components/home/seat'; 
import Announce from '../components/home/announcements';
import Footer from '../components/footer';
import Layout from '../components/layout';


function HomePage() {
    return (
         <div className="bg-black overflow-x-hidden font-instrument">
        <Home />
        <Subscribe />
        <Belief />
        <Seat />
        <Podcast />
        <Events />
        <Testimony />
        <Partner />
        <Announce /> 
        <Footer />
      </div> 
    );
  }
  
  export default HomePage;