import React from 'react'
import NearbyRecommendations from '../components/NearbyRecommendations';
import PetsMap from '../components/GoogleMap';


const Map = () => {
  return (
    <div>
      <NearbyRecommendations />
      <PetsMap/>
    </div>
  )
}

export default Map