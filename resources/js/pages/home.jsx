import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import TrailersSection from '../components/TrailersSection';
import AppLayout from '../layouts/AppLayout';
import { usePage } from '@inertiajs/react';


const Home = () => {

  const {props} = usePage()

  const movies = props.movies;

  

  return (
    <AppLayout>
      <HeroSection />
      <FeatureSection movies={movies} />
      <TrailersSection />
    </AppLayout>
  )
}

export default Home;