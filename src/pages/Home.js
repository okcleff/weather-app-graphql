import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_WEATHER_QUERY } from '../graphql/Queries';

const Home = () => {
  const [citySearched, setCitySearched] = useState();
  const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: { name: citySearched },
  });

  if (error) return <h1>Error found</h1>;
  if (data) {
    console.log(data);
  }

  const searchCity = (e) => {
    e.preventDefault();
    getWeather();
  };

  return (
    <div className='home'>
      <h1>Search For Weather</h1>
      <form>
        <input
          type='text'
          placeholder='City name...'
          onChange={(e) => setCitySearched(e.target.value)}
        />
        <button onClick={searchCity} type='submit'>
          Search
        </button>
      </form>
      <div className='weather'>
        {data && (
          <>
            <h1> {data.getCityByName.name} </h1>
            <h1>
              Temperature: {data.getCityByName.weather.temperature.actual}
            </h1>
            <h1>
              Description: {data.getCityByName.weather.summary.description}
            </h1>
            <h1>Wind Speed: {data.getCityByName.weather.wind.speed}</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
