import * as topojson from 'topojson';
import SunCalc from 'suncalc';
import moment from 'moment';
import * as d3 from 'd3';

// Incorporate data into built scripts for simplicity of distribution
import citiesData from './data-cities.json';
import worldSVG from './data-world-topo.json';
import { IXY, ILatLng, IOptions } from './models';
import { simpleUID } from './utils';

export class WorldDaylightMapGen {
  //
  // Define unique ids for this instance
  //
  private readonly uid = simpleUID();
  private readonly nightPathId = 'night-path-id-' + this.uid;
  private readonly sunId = 'sun-id-' + this.uid;
  private readonly landId = 'land-id-' + this.uid;
  private readonly landGradientId = 'land-gradient-id-' + this.uid;
  private readonly linearGradientId = 'linear-gradient-id-' + this.uid;
  private readonly radialGradientId = 'radial-gradient-id-' + this.uid;
  //
  // Other params
  //
  private containerWidth = 500;
  private currDate: Date = new Date();
  private svg: SVGElement | undefined;
  private projectionScale: number;
  private options: IOptions;
  private scalarX: number;
  private scalarY: number;
  private cities: {
    id: string;
    xy: IXY;
    latLng: ILatLng;
    population: number;
    country: string;
    title: string;
    opacity: 0 | 1;
  }[] = [];

  constructor(
    private readonly svgId: string,
    private readonly timeId: string,
    private readonly dateId: string,
    private readonly timezoneId: string,
    options?: Partial<IOptions>
  ) {
    // Check for dependencies
    if (!SunCalc || !d3) {
      throw new Error('Unmet dependency (requires d3.js, SunCalc)');
    }

    /**
     * TODO: the options values vs. class properties seems like a pointless demarcation
     * TODO: ... might as well reduce to just class properties at some point
     */
    this.options = {
      // Default Values
      tickDur: 400,
      shadowOpacity: 0.16,
      lightsOpacity: 0.5,
      sunOpacity: 0.11,
      precisionLat: 1, // How many latitudinal degrees per point when checking solar position.
      precisionLng: 10, // How may longitudial degrees per sunrise / sunset path point.
      mapWidth: 1100,
      mapHeight: 550,
      refreshMap: true, // Periodically redraw map to keep current time
      refreshMapInterval: 60000, // Update interval
      bgColorLeft: '#42448A',
      bgColorRight: '#376281',
      lightsColor: '#FFBEA0',
      worldPaths: 'assets/world-110m.json',
      citiesDataPath: 'assets/cities-200000.json',
      isSunshineDisplayed: true,
      icons: [],
      // Custom Values
      ...options,
    };

    this.scalarX = this.options.mapWidth / 360;
    this.scalarY = this.options.mapHeight / 180;
    this.projectionScale = this.options.mapWidth / 6.25;

    // Find and set SVGElement
    const svg: SVGElement | null = document.getElementById(this.svgId) as any;
    if (!(svg instanceof SVGElement)) {
      throw new Error("Can't find span with id: " + this.svgId);
    }
    this.svg = svg;
    this.updateDateTime();
    this.drawAll();
  }

  // Setters
  setContainerWidth = (val: number) => {
    this.containerWidth = val;
    this.redrawAll();
  };

  // Utility method for altering color luminance.
  colorLuminance(hex: string, lum = 0) {
    let c = null;
    let i = 0;
    let rgb = '#';
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6)
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

    while (i < 3) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      rgb += ('00' + c).substr(c.length);
      i++;
    }
    return rgb;
  }

  isDaylight(obj: any): boolean {
    return obj.altitude > 0;
  }

  isNorthSun(date: Date): boolean {
    const result = this.isDaylight(SunCalc.getPosition(date, 90, 0));
    return result;
  }

  getSunriseSunsetLatitude(lng: number, isNorthSun: boolean): number {
    let delta;
    let endLat;
    let lat;
    let startLat;

    if (isNorthSun) {
      startLat = -90;
      endLat = 90;
      delta = this.options.precisionLat;
    } else {
      startLat = 90;
      endLat = -90;
      delta = -this.options.precisionLat;
    }
    lat = startLat;

    while (lat !== endLat) {
      if (this.isDaylight(SunCalc.getPosition(this.currDate, lat, lng))) {
        return lat;
      }
      lat += delta;
    }
    return lat;
  }

  getAllSunPositionsAtLng(lng: number): { peak: number; lat: number } {
    let peak = 0;
    let lat = -90;
    let result: { peak: number; lat: number } = { peak, lat };
    while (lat < 90) {
      const alt = SunCalc.getPosition(this.currDate, lat, lng).altitude;
      if (alt > peak) {
        peak = alt;
        result = { peak, lat };
      }
      lat += this.options.precisionLng;
    }
    return result;
  }

  getSunPosition(): IXY {
    let lng = -180;
    let peak = 0;
    let result: ILatLng = { lat: -1, lng: -1 };
    while (lng < 180) {
      const alt = this.getAllSunPositionsAtLng(lng);
      if (alt.peak > peak) {
        peak = alt.peak;
        result = { lat: alt.lat, lng };
      }
      lng += this.options.precisionLat;
    }
    if (result.lat === -1 && result.lng === -1) throw new Error('Poor Logic');
    return this.coordToXY(result);
  }

  getAllSunriseSunsetCoords(isNorthSun: boolean): ILatLng[] {
    let lng = -180;
    const coords: ILatLng[] = [];
    while (lng <= 180) {
      coords.push({ lat: this.getSunriseSunsetLatitude(lng, isNorthSun), lng });
      lng += this.options.precisionLng;
    }
    return coords;
  }

  coordToXY(coord: ILatLng): IXY {
    const x = (coord.lng + 180) * this.scalarX;
    const y = this.options.mapHeight - (coord.lat + 90) * this.scalarY;
    return { x, y };
  }

  getCityOpacity(coord: ILatLng): 0 | 1 {
    if (SunCalc.getPosition(this.currDate, coord.lat, coord.lng).altitude > 0) {
      return 0;
    }
    return 1;
  }

  getCityRadius(p: number) {
    if (p < 200000) return 0.3;
    if (p < 500000) return 0.4;
    if (p < 100000) return 0.5;
    if (p < 2000000) return 0.6;
    if (p < 4000000) return 0.8;
    return 1;
  }

  getPath(isNorthSun: boolean) {
    const path: IXY[] = [];
    const coords = this.getAllSunriseSunsetCoords(isNorthSun);
    coords.forEach(val => {
      return path.push(this.coordToXY(val));
    });
    return path;
  }

  getPathString(isNorthSun: boolean) {
    const pathData = this.getPath(isNorthSun);
    const yStart = isNorthSun ? this.options.mapHeight : 0;
    const lineFunction = d3
      .line<IXY>()
      .x(function(d) {
        return d.x;
      })
      .y(function(d: any) {
        return d.y;
      })
      .curve(d3.curveBasis);

    const path = `M 0 ${yStart} ${lineFunction(pathData)} L  ${
      this.options.mapWidth
    }, ${yStart} L 0, ${yStart} `;
    return path;
  }

  createDefs() {
    d3.select(this.svg!)
      .append('defs')
      .append('linearGradient')
      .attr('id', this.linearGradientId)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    d3.select(`#${this.linearGradientId}`)
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', this.options.bgColorLeft);
    d3.select(`#${this.linearGradientId}`)
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', this.options.bgColorRight);

    d3.select(this.svg!)
      .select('defs')
      .append('linearGradient')
      .attr('id', this.landGradientId)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    d3.select(`#${this.landGradientId}`)
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', this.colorLuminance(this.options.bgColorLeft, -0.2));

    d3.select(`#${this.landGradientId}`)
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', this.colorLuminance(this.options.bgColorRight, -0.2));

    d3.select(this.svg!)
      .select('defs')
      .append('radialGradient')
      .attr('id', this.radialGradientId);

    d3.select(`#${this.radialGradientId}`)
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-opacity', this.options.sunOpacity)
      .attr('stop-color', 'rgb(255, 255, 255)');

    d3.select(`#${this.radialGradientId}`)
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-opacity', 0)
      .attr('stop-color', 'rgb(255, 255, 255)');
  }

  drawSVG() {
    d3.select(this.svg!)
      .attr(
        'viewBox',
        `0 0  ${this.options.mapWidth} ${this.options.mapHeight}`
      )
      .attr('preserveAspectRatio', 'none')
      // DWD: I'm extending the rect above the top edge of the svg by 999
      // in order to provide a background to the controls when "outer-top" selected
      .append('rect')
      .attr('width', this.options.mapWidth)
      .attr('height', this.options.mapHeight + 999)
      .attr('y', -999)
      .attr('fill', `url(#${this.linearGradientId})`);
  }

  drawSun() {
    if (!this.options.isSunshineDisplayed) return;
    const { x, y } = this.getSunPosition();
    d3.select(this.svg!)
      .append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('id', this.sunId)
      .attr('r', 150)
      .attr('opacity', 1)
      .attr('fill', `url(#${this.radialGradientId})`);
  }

  drawIcons() {
    this.options.icons.forEach((icon, ind) => {
      // Logic to decide/prioritize icon size
      const iconToSvgWidthRatio = icon.iconToSvgWidthRatio || 1 / 20;
      const defaultSize = this.containerWidth * iconToSvgWidthRatio;
      const iconWidth = icon.iconWidth || icon.iconHeight || defaultSize;
      const iconHeight = icon.iconHeight || icon.iconWidth || defaultSize;
      const { x, y } = this.coordToXY(icon.iconCoord);
      // const iconId = 'icon-id-' + ind;
      d3.select(this.svg!)
        .append('a')
        .attr('href', icon.iconLink || '')
        .append('image')
        .attr('href', icon.iconUrl)
        .attr('x', x - iconWidth / 2)
        .attr('y', y - iconHeight / 2)
        // .attr('id', iconId)
        .attr('width', iconWidth)
        .attr('height', iconHeight)
        .attr('opacity', 1)
        .attr('preserveAspectRatio', 'none')
        .append('title')
        .text(icon.iconLabel);
    });
  }

  drawPath() {
    const path = this.getPathString(this.isNorthSun(this.currDate));
    d3.select(this.svg!)
      .append('path')
      .attr('id', this.nightPathId)
      .attr('fill', 'rgb(0,0,0)')
      .attr('fill-opacity', this.options.shadowOpacity)
      .attr('d', path);
  }

  drawLand() {
    const projection = d3
      .geoEquirectangular()
      .scale(this.projectionScale)
      .translate([this.options.mapWidth / 2, this.options.mapHeight / 2])
      .precision(0.1);

    d3.select(this.svg!)
      .append('path')
      .attr('id', this.landId)
      .attr('fill', `url(#${this.landGradientId})`)
      .datum(topojson.feature(worldSVG as any, worldSVG.objects.land as any))
      .attr('d', d3.geoPath().projection(projection));
  }

  drawCities() {
    citiesData.forEach((val: string[], i: number) => {
      // Data entries have this form:
      // ["1137347", "Dubai", "25.0657", "55.17128", "03", "AE"],
      const coord = { lat: parseFloat(val[2]), lng: parseFloat(val[3]) };
      const xy = this.coordToXY(coord);
      const id = `city${i}`;
      const opacity = this.getCityOpacity(coord);
      const radius = this.getCityRadius(parseFloat(val[0]));

      d3.select(this.svg!)
        .append('circle')
        .attr('cx', xy.x)
        .attr('cy', xy.y)
        .attr('id', id)
        .attr('r', radius)
        .attr('opacity', opacity * this.options.lightsOpacity)
        .attr('fill', this.options.lightsColor);

      this.cities.push({
        title: val[1],
        country: val[5],
        latLng: coord,
        xy,
        population: parseInt(val[0], 10),
        id,
        opacity,
      });
    });
  }

  redrawSun(): void {
    if (!this.options.isSunshineDisplayed) return;
    const xy = this.getSunPosition();
    d3.select(`#${this.sunId}`)
      .attr('cx', xy.x)
      .attr('cy', xy.y);
  }

  redrawCities() {
    this.cities.forEach((val, i) => {
      const opacity = this.getCityOpacity(val.latLng);
      if (val.opacity !== opacity) {
        this.cities[i].opacity = opacity;
        d3.select(`#${val.id}`)
          .transition()
          .duration(this.options.tickDur * 2)
          .attr('opacity', this.options.lightsOpacity * opacity);
      }
    });
  }

  redrawPath() {
    let path = this.getPathString(this.isNorthSun(this.currDate));
    let nightPath = d3.select(`#${this.nightPathId}`);
    return nightPath.attr('d', path);
  }

  redrawAll(increment: number = 0) {
    !!increment &&
      this.currDate.setMinutes(this.currDate.getMinutes() + increment);
    this.redrawPath();
    this.redrawSun();
    this.redrawCities();
    this.updateDateTime();
  }

  drawAll() {
    this.drawSVG();
    this.createDefs();
    this.drawIcons();
    this.drawLand();
    this.drawPath();
    this.drawSun();
    this.drawCities();
    this.drawIcons();
  }

  updateDateTime() {
    //
    // Determine Timezone
    //
    const regEx = this.currDate.toString().match(/\(([A-Za-z\s].*)\)/);
    if (!regEx) {
      throw new Error('Poor Logic');
    }
    const tz = regEx[1];

    //
    // Set Displayed Timezone
    //
    const timezoneLabelText = document.getElementById(this.timezoneId);
    if (timezoneLabelText) {
      timezoneLabelText.innerText = tz;
    } else {
      throw new Error("Can't find span with id: " + this.timezoneId);
    }

    //
    // Set Displayed Time
    //
    const timeTextSpan = document.getElementById(this.timeId);
    if (timeTextSpan) {
      timeTextSpan.innerText = moment(this.currDate).format('HH:mm');
    } else {
      throw new Error("Can't find span with id: " + this.timeId);
    }

    //
    // Set Displayed Date
    //
    const dateTextSpan = document.getElementById(this.dateId);
    if (dateTextSpan) {
      dateTextSpan.innerText = moment(this.currDate).format('DD MMM');
    } else {
      throw new Error("Can't find span with id: " + this.dateId);
    }
  }
}
