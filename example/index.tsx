import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { WorldDaylightMap, Options } from '../.';
// const WorldDaylightMap = require('../dist').default;
import './styles.css';

const iconToSvgWidthRatio = 1 / 20;

const options: Options = {
  /*   width: '100%',
  height: 600, */
  controlsPosition: 'outer-top',
  controlsScale: 1,
  font: "'Roboto', sans-serif",
  fontSize: undefined,
  isSunshineDisplayed: !true,
  icons: [
    //
    {
      iconLabel: 'University of Hawaii Institute for Astronomy',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
      iconCoord: { lat: 20.32229757302469, lng: -154.52142563968567 },
      iconLink: 'http://www.ifa.hawaii.edu/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'NASA Infrared Telescope Facility (IRTF)',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-observatory.png',
      iconCoord: { lat: 20.32229757302469, lng: -154.52142563968567 },
      iconLink: 'http://irtfweb.ifa.hawaii.edu/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'ATLAS 1 (T05): Asteroid Terrestrial-Last Alert System',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
      iconCoord: { lat: 20.32229757302469, lng: -154.52142563968567 },
      iconLink:
        'https://en.wikipedia.org/wiki/Asteroid_Terrestrial-impact_Last_Alert_System',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Las Cumbres Observatory (multiple locations)',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
      iconCoord: { lat: 34.648637159303256, lng: -117.71533034016377 },
      iconLink: 'https://lco.global/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel:
        'NEOWISE: Near Earth Object Wide-Field Infrared Survey Explorer',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-rocket.png',
      iconCoord: { lat: 34.648637159303256, lng: -117.71533034016377 },
      iconLink: 'https://www.nasa.gov/mission_pages/neowise/main/index.html',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'GSSR: Goldstone Solar System Radar',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-dish.png',
      iconCoord: { lat: 34.648637159303256, lng: -117.71533034016377 },
      iconLink: 'https://gssr.jpl.nasa.gov/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Kitt Peak National Observatory',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-magnifier.png',
      iconCoord: { lat: 32.73837465712535, lng: -114.24294985426538 },
      iconLink: 'https://www.noao.edu/kpno/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Catalina Sky Survey (703)',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
      iconCoord: { lat: 32.096710284340936, lng: -111.25091822377047 },
      iconLink: 'https://catalina.lpl.arizona.edu/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Catalina Sky Survey (G96) - Mt. Lemmon',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
      iconCoord: { lat: 32.287911051356375, lng: -111.07333853486054 },
      iconLink: 'https://catalina.lpl.arizona.edu/about/facilities/telescopes',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Discovery Channel Telescope',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-magnifier.png',
      iconCoord: { lat: 34.96893451045559, lng: -111.51861811103456 },
      iconLink: 'http://ast.noao.edu/facilities/future/dct',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Lowell Observatory',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-magnifier.png',
      iconCoord: { lat: 34.96893451045559, lng: -111.51861811103456 },
      iconLink: 'https://lowell.edu/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Magdalena Ridge Observatory (H01 - NEOtech)',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
      iconCoord: { lat: 33.98516630890421, lng: -107.33887020854937 },
      iconLink: 'http://www.mro.nmt.edu/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel:
        'LINEAR (G45): Lincoln Near Earth Asteroid Research Program on the Space Surveillance Telescope (moving to Australia)',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
      iconCoord: { lat: 33.98516630890421, lng: -107.33887020854937 },
      iconLink:
        'https://en.wikipedia.org/wiki/Lincoln_Near-Earth_Asteroid_Research',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'McDonald Observatory',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
      iconCoord: { lat: 31.659061792858385, lng: -105.26261335770677 },
      iconLink: 'https://mcdonaldobservatory.org/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Astronomical Research Institute (H21)',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
      iconCoord: { lat: 38.99806187893965, lng: -88.88436667636063 },
      iconLink: 'https://www.astro-research.org/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Magdalena Ridge Observatory (H01 - NEOtech)',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
      iconCoord: { lat: 33.98516630890421, lng: -107.33887020854937 },
      iconLink: 'http://www.mro.nmt.edu/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Magdalena Ridge Observatory (H01 - NEOtech)',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
      iconCoord: { lat: 33.98516630890421, lng: -107.33887020854937 },
      iconLink: 'http://www.mro.nmt.edu/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Magdalena Ridge Observatory (H01 - NEOtech)',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
      iconCoord: { lat: 33.98516630890421, lng: -107.33887020854937 },
      iconLink: 'http://www.mro.nmt.edu/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel:
        'Minor Planet Center under PDS-Small Bodies Node at University of Maryland',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-computer.png',
      iconCoord: { lat: 38.99025469916968, lng: -76.89422227361928 },
      iconLink: 'https://pds-smallbodies.astro.umd.edu/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Minor Planet Center',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-computer.png',
      iconCoord: { lat: 42.031487342315955, lng: -71.54235562576747 },
      iconLink: 'https://minorplanetcenter.net//iau/mpc.html',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Arecibo Radar Observation of NEAs',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-dish.png',
      iconCoord: { lat: 17.324925063153678, lng: -68.56719674818383 },
      iconLink: 'http://www.naic.edu/~pradar/',
      iconToSvgWidthRatio,
    },
    //
    {
      iconLabel: 'Cerro Tololo Interational Observatory (ARI Follow-Up)',
      iconUrl:
        'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
      iconCoord: { lat: -31.392403639071922, lng: -67.91893496407594 },
      iconLink: 'http://www.ctio.noao.edu/noao/',
      iconToSvgWidthRatio,
    },
    //
    // {
    //   iconLabel: 'Magdalena Ridge Observatory (H01 - NEOtech)',
    //   iconUrl:
    //     'https://d-w-d.github.io/world-daylight-map/images/icon-telescope.png',
    //   iconCoord: { lat: 33.98516630890421, lng: -107.33887020854937 },
    //   iconLink: 'http://www.mro.nmt.edu/',
    //   iconToSvgWidthRatio,
    // },
  ],
};

const App = () => {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <WorldDaylightMap options={options} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
