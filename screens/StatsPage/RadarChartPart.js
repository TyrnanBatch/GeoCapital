// export default RadarChartPart;
import React, { useState, useEffect } from 'react';
import { View, Dimensions, Platform, Text } from 'react-native';
import Svg, { Polygon, Line, Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const RadarChartPart = ({ displayMode }) => {


const [capitalNorthAmericaHighScore, setCapitalNorthAmericaHighScore] = useState(0);
const [capitalSouthAmericaHighScore, setCapitalSouthAmericaHighScore] = useState(0);
const [capitalEuropeHighScore, setCapitalEuropeHighScore] = useState(0);
const [capitalAsiaHighScore, setCapitalAsiaHighScore] = useState(0);
const [capitalAfricaHighScore, setCapitalAfricaHighScore] = useState(0);
const [capitalOceaniaHighScore, setCapitalOceaniaHighScore] = useState(0);

const [flagNorthAmericaHighScore, setFlagNorthAmericaHighScore] = useState(0);
const [flagSouthAmericaHighScore, setFlagSouthAmericaHighScore] = useState(0);
const [flagEuropeHighScore, setFlagEuropeHighScore] = useState(0);
const [flagAsiaHighScore, setFlagAsiaHighScore] = useState(0);
const [flagAfricaHighScore, setFlagAfricaHighScore] = useState(0);
const [flagOceaniaHighScore, setFlagOceaniaHighScore] = useState(0);

const [locationNorthAmericaHighScore, setLocationNorthAmericaHighScore] = useState(0);
const [locationSouthAmericaHighScore, setLocationSouthAmericaHighScore] = useState(0);
const [locationEuropeHighScore, setLocationEuropeHighScore] = useState(0);
const [locationAsiaHighScore, setLocationAsiaHighScore] = useState(0);
const [locationAfricaHighScore, setLocationAfricaHighScore] = useState(0);
const [locationOceaniaHighScore, setLocationOceaniaHighScore] = useState(0);



const getHighScore = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : 0;
  } catch (error) {
    console.error('Error retrieving high score:', error);
    return 0;
  }
};

useFocusEffect(
  React.useCallback(() => {
    const fetchHighScores = async () => {
      try {
        const capitalNorthAmericaScore = await getHighScore('CapitalNorthAmericaHighScore');
        setCapitalNorthAmericaHighScore(capitalNorthAmericaScore);
        const capitalSouthAmericaScore = await getHighScore('CapitalSouthAmericaHighScore');
        setCapitalSouthAmericaHighScore(capitalSouthAmericaScore);
        const capitalEuropeScore = await getHighScore('CapitalEuropeHighScore');
        setCapitalEuropeHighScore(capitalEuropeScore);
        const capitalAsiaScore = await getHighScore('CapitalAsiaHighScore');
        setCapitalAsiaHighScore(capitalAsiaScore);
        const capitalAfricaScore = await getHighScore('CapitalAfricaHighScore');
        setCapitalAfricaHighScore(capitalAfricaScore);
        const capitalOceaniaScore = await getHighScore('CapitalOceaniaHighScore');
        setCapitalOceaniaHighScore(capitalOceaniaScore);

        const flagNorthAmericaScore = await getHighScore('FlagNorthAmericaHighScore');
        setFlagNorthAmericaHighScore(flagNorthAmericaScore);
        const flagSouthAmericaScore = await getHighScore('FlagSouthAmericaHighScore');
        setFlagSouthAmericaHighScore(flagSouthAmericaScore);
        const flagEuropeScore = await getHighScore('FlagEuropeHighScore');
        setFlagEuropeHighScore(flagEuropeScore);
        const flagAsiaScore = await getHighScore('FlagAsiaHighScore');
        setFlagAsiaHighScore(flagAsiaScore);
        const flagAfricaScore = await getHighScore('FlagAfricaHighScore');
        setFlagAfricaHighScore(flagAfricaScore);
        const flagOceaniaScore = await getHighScore('FlagOceaniaHighScore');
        setFlagOceaniaHighScore(flagOceaniaScore);

        const locationNorthAmericaScore = await getHighScore('LocationNorthAmericaHighScore');
        setLocationNorthAmericaHighScore(locationNorthAmericaScore);
        const locationSouthAmericaScore = await getHighScore('LocationSouthAmericaHighScore');
        setLocationSouthAmericaHighScore(locationSouthAmericaScore);
        const locationEuropeScore = await getHighScore('LocationEuropeHighScore');
        setLocationEuropeHighScore(locationEuropeScore);
        const locationAsiaScore = await getHighScore('LocationAsiaHighScore');
        setLocationAsiaHighScore(locationAsiaScore);
        const locationAfricaScore = await getHighScore('LocationAfricaHighScore');
        setLocationAfricaHighScore(locationAfricaScore);
        const locationOceaniaScore = await getHighScore('LocationOceaniaHighScore');
        setLocationOceaniaHighScore(locationOceaniaScore);
      } catch (error) {
        console.error('Error fetching high scores:', error);
      }
    };

    fetchHighScores();
  }, [])
);

  //countris and capitals
  const continentsBlue = [
    { name: 'Asia', score: Math.round((capitalAsiaHighScore / 46) * 100) },
    { name: 'Oceania', score: Math.round((capitalOceaniaHighScore / 14) * 100) },
    { name: 'Africa', score: Math.round((capitalAfricaHighScore / 54) * 100) },
    { name: 'Europe', score: Math.round((capitalEuropeHighScore / 47) * 100) },
    { name: 'South America', score: Math.round((capitalSouthAmericaHighScore / 12) * 100) },
    { name: 'North America', score: Math.round((capitalNorthAmericaHighScore / 23) * 100) },
  ];

  //flag game
  const continentsGreen = [
    { name: 'Asia', score: Math.round((flagAsiaHighScore / 46) * 100) },
    { name: 'Oceania', score: Math.round((flagOceaniaHighScore / 14) * 100) },
    { name: 'Africa', score: Math.round((flagAfricaHighScore / 54) * 100) },
    { name: 'Europe', score: Math.round((flagEuropeHighScore / 47) * 100) },
    { name: 'South America', score: Math.round((flagSouthAmericaHighScore / 12) * 100) },
    { name: 'North America', score: Math.round((flagNorthAmericaHighScore / 23) * 100) },
  ];


  //location game
  const continentsOrange = [
    { name: 'Asia', score: Math.round((locationAsiaHighScore / 46) * 100) },
    { name: 'Oceania', score: Math.round((locationOceaniaHighScore / 14) * 100) },
    { name: 'Africa', score: Math.round((locationAfricaHighScore / 54) * 100) },
    { name: 'Europe', score: Math.round((locationEuropeHighScore / 47) * 100) },
    { name: 'South America', score: Math.round((locationSouthAmericaHighScore / 12) * 100) },
    { name: 'North America', score: Math.round((locationNorthAmericaHighScore / 23) * 100) },
  ];


  const size = Platform.isPad ? screenWidth * 0.6 : screenWidth * 0.8;
  const radius = size / 2 * 0.98;
  const numSides = 6; // Number of sides (hexagon vertices)
  const levels = 5; // Number of hexagons (levels)

  // Function to calculate points for a regular polygon
  const calculatePolygonPoints = (cx, cy, sides, radius) => {
    const angleStep = (2 * Math.PI) / sides;
    const points = [];
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  // Function to render radar chart levels (hexagons and lines)
  const renderLevels = () => {
    const stepSize = radius / levels;
    const elements = [];
    const dotsGreen = [];
    const dotsBlue = [];
    const dotsOrange = [];
    const linePointsGreen = [];
    const linePointsBlue = [];
    const linePointsOrange = [];

    for (let level = 1; level <= levels; level++) {
      const currentRadius = level * stepSize;

      // Calculate the outermost hexagon vertices
      const outerVertices = [];
      for (let i = 0; i < numSides; i++) {
        const angle = (i * 2 * Math.PI) / numSides;
        const x = size / 2 + currentRadius * Math.cos(angle);
        const y = size / 2 + currentRadius * Math.sin(angle);
        outerVertices.push({ x, y });
      }

      // Render filled polygon behind hexagon and lines
      elements.push(
        <Polygon
          key={`filled-polygon-${level}`}
          points={outerVertices.map(v => `${v.x},${v.y}`).join(' ')}
          fill="pink"
          fillOpacity="0.5"
        />
      );

      // Render hexagon
      elements.push(
        <Polygon
          key={`hexagon-${level}`}
          points={calculatePolygonPoints(size / 2, size / 2, numSides, currentRadius)}
          fill="none"
          stroke="gray"
          strokeWidth="3"
        />
      );

      // Render lines connecting center to vertices
      for (let i = 0; i < numSides; i++) {
        const vertex = outerVertices[i];
        elements.push(
          <Line
            key={`line-center-${level}-${i}`}
            x1={size / 2}
            y1={size / 2}
            x2={vertex.x}
            y2={vertex.y}
            stroke="gray"
            strokeWidth="1"
          />
        );
      }

      // Store dot positions and render dots for green data
      if (level === levels) {
        continentsGreen.forEach((continent, index) => {
          const angle = index * (2 * Math.PI / numSides);
          const scoreRatio = continent.score / 100; // Normalize score to a ratio

          // Calculate coordinates for the dot
          const x1 = size / 2;
          const y1 = size / 2;
          const x2 = size / 2 + currentRadius * Math.cos(angle);
          const y2 = size / 2 + currentRadius * Math.sin(angle);

          // Calculate dot position
          const dotX = x1 + (x2 - x1) * scoreRatio;
          const dotY = y1 + (y2 - y1) * scoreRatio;

          // Store dot position for green data
          dotsGreen.push({ x: dotX, y: dotY });

          // Render dot for green data point
          if (displayMode === 'green' || displayMode === 'all') {
            elements.push(
              <Circle
                key={`dot-green-${continent.name}`}
                cx={dotX}
                cy={dotY}
                r={screenWidth * 0.005}
                fill="blue"
              />
            );
          }
        });

        // Store points for the green lines connecting dots
        for (let i = 0; i < dotsGreen.length; i++) {
          linePointsGreen.push(`${dotsGreen[i].x},${dotsGreen[i].y}`);
        }

        // Repeat for blue data
        continentsBlue.forEach((continent, index) => {
          const angle = index * (2 * Math.PI / numSides);
          const scoreRatio = continent.score / 100; // Normalize score to a ratio

          // Calculate coordinates for the dot
          const x1 = size / 2;
          const y1 = size / 2;
          const x2 = size / 2 + currentRadius * Math.cos(angle);
          const y2 = size / 2 + currentRadius * Math.sin(angle);

          // Calculate dot position
          const dotX = x1 + (x2 - x1) * scoreRatio;
          const dotY = y1 + (y2 - y1) * scoreRatio;

          // Store dot position for blue data
          dotsBlue.push({ x: dotX, y: dotY });

          // Render dot for blue data point
          if (displayMode === 'blue' || displayMode === 'all') {
            elements.push(
              <Circle
                key={`dot-blue-${continent.name}`}
                cx={dotX}
                cy={dotY}
                r={screenWidth * 0.005}
                fill="red"
              />
            );
          }
        });

        // Store points for the blue lines connecting dots
        for (let i = 0; i < dotsBlue.length; i++) {
          linePointsBlue.push(`${dotsBlue[i].x},${dotsBlue[i].y}`);
        }

        // Repeat for orange data
        continentsOrange.forEach((continent, index) => {
          const angle = index * (2 * Math.PI / numSides);
          const scoreRatio = continent.score / 100; // Normalize score to a ratio

          // Calculate coordinates for the dot
          const x1 = size / 2;
          const y1 = size / 2;
          const x2 = size / 2 + currentRadius * Math.cos(angle);
          const y2 = size / 2 + currentRadius * Math.sin(angle);

          // Calculate dot position
          const dotX = x1 + (x2 - x1) * scoreRatio;
          const dotY = y1 + (y2 - y1) * scoreRatio;

          // Store dot position for orange data
          dotsOrange.push({ x: dotX, y: dotY });

          // Render dot for orange data point
          if (displayMode === 'orange' || displayMode === 'all') {
            elements.push(
              <Circle
                key={`dot-orange-${continent.name}`}
                cx={dotX}
                cy={dotY}
                r={screenWidth * 0.005}
                fill="yellow"
              />
            );
          }
        });

        // Store points for the orange lines connecting dots
        for (let i = 0; i < dotsOrange.length; i++) {
          linePointsOrange.push(`${dotsOrange[i].x},${dotsOrange[i].y}`);
        }
      }
    }

    // Render filled polygons for green, blue, and orange data
    if (displayMode === 'green' || displayMode === 'all') {
      elements.push(
        <Polygon
          key={`filled-polygon-green`}
          points={linePointsGreen.join(' ')}
          fill="blue"
          fillOpacity="0.5"
        />
      );
    }

    if (displayMode === 'blue' || displayMode === 'all') {
      elements.push(
        <Polygon
          key={`filled-polygon-blue`}
          points={linePointsBlue.join(' ')}
          fill="red"
          fillOpacity="0.5"
        />
      );
    }

    if (displayMode === 'orange' || displayMode === 'all') {
      elements.push(
        <Polygon
          key={`filled-polygon-orange`}
          points={linePointsOrange.join(' ')}
          fill="yellow"
          fillOpacity="0.5"
        />
      );
    }

    return elements;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ flex: 1 }}>
        {renderLevels()}
      </Svg>

      <View
        style={{
          left: Platform.isPad ? screenWidth * 0.095 : screenWidth * 0.06,
          top: Platform.isPad ? screenWidth * 0.0 : 0,
          backgroundColor: 'pink',
          position: 'absolute',
          borderRadius: screenWidth * 0.08,
          padding: screenWidth * 0.01
        }}
      >
        <Text style={{color: 'black',fontSize: screenWidth * 0.024, alignSelf: 'center', 
                     marginTop: -screenWidth * 0.01, fontFamily: 'Chalkboard SE', }} >{' SOUTH AMERICA '}</Text> 
      </View>

      <View
        style={{
          left: Platform.isPad ? screenWidth * 0.68 : screenWidth * 0.72,
          top: Platform.isPad ? screenWidth * 0.0 : 0,
          backgroundColor: 'pink',
          position: 'absolute',
          borderRadius: screenWidth * 0.08,
          padding: screenWidth * 0.01
        }}
      >
        <Text style={{color: 'black',fontSize: screenWidth * 0.024, alignSelf: 'center', 
                     marginTop: -screenWidth * 0.01, fontFamily: 'Chalkboard SE', }} >{' NORTH AMERICA '}</Text> 
      </View>

      <View
        style={{
          left: Platform.isPad ? screenWidth * 0.81 : screenWidth * 0.865,
          top: Platform.isPad ? screenWidth * 0.24 : screenWidth * 0.29,
          backgroundColor: 'pink',
          position: 'absolute',
          borderRadius: screenWidth * 0.08,
          padding: screenWidth * 0.01
        }}
      >
        <Text style={{color: 'black',fontSize: screenWidth * 0.024, alignSelf: 'center', 
                     marginTop: -screenWidth * 0.01, fontFamily: 'Chalkboard SE', }} >{'  ASIA  '}</Text> 
      </View>

      <View
        style={{
          left: Platform.isPad ? screenWidth * 0.065 : screenWidth * 0.005,
          top: Platform.isPad ? screenWidth * 0.24 : screenWidth * 0.29,
          backgroundColor: 'pink',
          position: 'absolute',
          borderRadius: screenWidth * 0.08,
          padding: screenWidth * 0.01
        }}
      >
          <Text style={{color: 'black',fontSize: screenWidth * 0.024, alignSelf: 'center', 
                     marginTop: -screenWidth * 0.01, fontFamily: 'Chalkboard SE', }} >{' EUROPE '}</Text> 
      </View>

      <View
        style={{
          left: Platform.isPad ? screenWidth * 0.2 : screenWidth * 0.14,
          top: Platform.isPad ? screenWidth * 0.47 : screenWidth * 0.68,
          backgroundColor: 'pink',
          position: 'absolute',
          borderRadius: screenWidth * 0.08,
          padding: screenWidth * 0.01
        }}
      >
        <Text style={{color: 'black',fontSize: screenWidth * 0.024, alignSelf: 'center', 
                     marginTop: -screenWidth * 0.01, fontFamily: 'Chalkboard SE', }} >{' AFRICA '}</Text> 
      </View>
      <View
        style={{
          left: Platform.isPad ? screenWidth * 0.68 : screenWidth * 0.74,
          top: Platform.isPad ? screenWidth * 0.47 : screenWidth * 0.68,
          backgroundColor: 'pink',
          position: 'absolute',
          borderRadius: screenWidth * 0.08,
          padding: screenWidth * 0.01
        }}
      >
          <Text style={{color: 'black',fontSize: screenWidth * 0.024, alignSelf: 'center', 
                     marginTop: -screenWidth * 0.01, fontFamily: 'Chalkboard SE', }} >{' OCEANIA '}</Text> 
      </View>

      <View
        style={{
          left: Platform.isPad ? screenWidth * 0.53 : screenWidth * 0.55,
          top: Platform.isPad ? screenWidth * 0.257 : screenWidth * 0.38,
          position: 'absolute',
          borderRadius: screenWidth * 0.08,
          padding: screenWidth * 0.01
        }}
      >
        <Text style={{color: 'black',fontSize: screenWidth * 0.015, alignSelf: 'center', 
                     marginTop: -screenWidth * 0.01, fontFamily: 'Chalkboard SE', }} >{'20%'}</Text> 
      </View>

      <View
        style={{
          left: Platform.isPad ? screenWidth * 0.59 : screenWidth * 0.63,
          top: Platform.isPad ? screenWidth * 0.257 : screenWidth * 0.38,
          position: 'absolute',
          borderRadius: screenWidth * 0.08,
          padding: screenWidth * 0.01
        }}
      >
         <Text style={{color: 'black',fontSize: screenWidth * 0.015, alignSelf: 'center', 
                     marginTop: -screenWidth * 0.01, fontFamily: 'Chalkboard SE', }} >{'40%'}</Text> 
      </View>

      <View
        style={{
          left: Platform.isPad ? screenWidth * 0.65 : screenWidth * 0.71,
          top: Platform.isPad ? screenWidth * 0.257 : screenWidth * 0.38,
          position: 'absolute',
          borderRadius: screenWidth * 0.08,
          padding: screenWidth * 0.01
        }}
      >
        <Text style={{color: 'black',fontSize: screenWidth * 0.015, alignSelf: 'center', 
                     marginTop: -screenWidth * 0.01, fontFamily: 'Chalkboard SE', }} >{'60%'}</Text> 
      </View>

      <View
        style={{
          left: Platform.isPad ? screenWidth * 0.71 : screenWidth * 0.785,
          top: Platform.isPad ? screenWidth * 0.257 : screenWidth * 0.38,
          position: 'absolute',
          borderRadius: screenWidth * 0.08,
          padding: screenWidth * 0.01
        }}
      >
         <Text style={{color: 'black',fontSize: screenWidth * 0.015, alignSelf: 'center', 
                     marginTop: -screenWidth * 0.01, fontFamily: 'Chalkboard SE', }} >{'80%'}</Text> 
      </View>

      <View
        style={{
          left: Platform.isPad ? screenWidth * 0.76 : screenWidth * 0.85,
          top: Platform.isPad ? screenWidth * 0.257 : screenWidth * 0.38,
          position: 'absolute',
          borderRadius: screenWidth * 0.08,
          padding: screenWidth * 0.01
        }}
      >
       <Text style={{color: 'black',fontSize: screenWidth * 0.015, alignSelf: 'center', 
                     marginTop: -screenWidth * 0.01, fontFamily: 'Chalkboard SE', }} >{'100%'}</Text> 
      </View>
    </View>
  );
};

export default RadarChartPart;