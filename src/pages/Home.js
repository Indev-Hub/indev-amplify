import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// import Gallery from '../components/gallery/Gallery';
import {
  // HomeClients,
  HomeHero
  // HomeOverview,
  // HomeRoles,
  // HomeFeatures,
  // ChannelSlider
} from '../components/home';
import gtm from '../lib/gtm';

const Home = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>indev home</title>
      </Helmet>
      <div>
        <HomeHero />
        {/* <Gallery /> */}
        {/* <HomeOverview />
        <HomeRoles />
        <ChannelSlider />
        <HomeFeatures />
        <HomeClients /> */}
      </div>
    </>
  );
};

export default Home;
