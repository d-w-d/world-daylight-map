import React, { useEffect, useRef, useState } from 'react';

import { IIcon } from './models/IIcon';
import { TControlsPosition } from './models/TControlsPosition';
import { TStyles } from './models/TStyles';
import { simpleUID } from './utils/simpleUID';
import { WorldDaylightMapGen as WDMG } from './utils/WorldDaylightMapGen';
import { useStyles } from './styles';
import { useContainerDimensions } from './hooks/useContainerDimensions';

let isStylesLoaded = false;
const uniqueContainerClassName =
  'worldDaylightMapDynamicStylesContainer-MWVmYTRkMWE2';

export interface IProps {
  options: {
    /* Settings passed to styles.ts */
    width?: number | string;
    height?: number | string;
    controlsPosition?: TControlsPosition;
    font?: string;
    fontSize?: number | string;
    controlsScale?: number;
    /* Settings passed to WorldDaylightMapGen.ts */
    isSunshineDisplayed?: boolean;
    icons?: IIcon[];
  };
}

export type Options = IProps['options'];

const defaultProps: IProps = {
  options: {
    width: '100%',
    height: '100%',
    controlsPosition: 'outer-top',
    font: "'Roboto', sans-serif",
    fontSize: undefined,
    controlsScale: 1,
    isSunshineDisplayed: true,
    icons: [],
  },
};

export const WorldDaylightMap = (props: Partial<IProps> = defaultProps) => {
  // --->>

  // Dynamically add style section to doc HEAD
  if (!isStylesLoaded) {
    isStylesLoaded = true;
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      .${uniqueContainerClassName} {
        color: #FFF;
        font-size: 24px;
      }
      .${uniqueContainerClassName} .hover-text :hover{
        background-color: rgba(255, 255, 255, 0.3);
        transition: background-color 0.2s ease-in-out;
        cursor: pointer;
      }
    `;
    document.head.appendChild(styleEl);
  }

  // Merge supplied options with default values
  const options: IProps['options'] = {
    ...defaultProps.options,
    ...(!!props ? props.options : {}),
  };
  const { isSunshineDisplayed, icons } = options;

  /**
   * Define d3-controlled element ids
   *
   * Note: These were defined in WDMG but this lead to
   * chicken-egg problems; so defining them here and passing to WDMG
   * since these elements are controlled by react
   */
  const uid = useRef(simpleUID());
  const svgId = 'svg-id-' + uid.current;
  const dateId = 'date-id-' + uid.current;
  const timeId = 'time-id-' + uid.current;
  const timezoneId = 'timezone-id-' + uid.current;

  // Define stateful params
  const [worldDaylightMap, setWorldDaylightMap] = useState<WDMG>();
  const [fontScaleFactor, setFontScaleFactor] = useState(1);
  const container = useRef<HTMLDivElement>(null);
  const containerDimensions = useContainerDimensions(container);

  // On initial render, hand control over to WorldDaylightMapGen (with d3 under hood)
  useEffect(() => {
    const wdmg = new WDMG(svgId, timeId, dateId, timezoneId, {
      isSunshineDisplayed,
      icons,
    });
    setWorldDaylightMap(wdmg);

    // Start redrawing every minute
    const timer = window.setInterval(() => {
      wdmg.redrawAll(1);
    }, 60_000);

    // Clear interval on component unmount
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  // Scale fontsize to container width
  useEffect(() => {
    if (!!containerDimensions.width && !!worldDaylightMap) {
      worldDaylightMap.setContainerWidth(containerDimensions.width);
      let fsf = containerDimensions.width / 1200;
      setFontScaleFactor(fsf);
    }
  }, [containerDimensions, worldDaylightMap]);

  const redraw = (dMins: number) => {
    !!worldDaylightMap && worldDaylightMap.redrawAll(dMins);
  };

  const styles: TStyles = useStyles(options, fontScaleFactor)();

  return (
    <div
      className={uniqueContainerClassName}
      style={styles.container}
      ref={container}
    >
      <svg style={styles.svg} id={svgId} />
      <div style={styles.controlsGrid}>
        <div style={styles.timezoneLabel}>
          <span style={styles.timezoneLabelText} id={timezoneId}></span>
        </div>
        <div
          className={'hover-text'}
          style={styles.decreaseTimezone}
          onClick={() => redraw(-60)}
        >
          <span style={styles.arrow}>&rsaquo;</span>
        </div>
        <div style={styles.time}>
          <span style={styles.timeText} id={timeId}></span>
        </div>
        <div
          className={'hover-text'}
          style={styles.increaseTimezone}
          onClick={() => redraw(60)}
        >
          <span style={styles.arrow}>&lsaquo;</span>
        </div>
        <div
          className={'hover-text'}
          style={styles.decreaseMonth}
          onClick={() => redraw(-43200)}
        >
          <span style={styles.arrow}>&lsaquo;&lsaquo;</span>
        </div>
        <div
          className={'hover-text'}
          style={styles.decreaseDay}
          onClick={() => redraw(-1440)}
        >
          <span style={styles.arrow}>&lsaquo;</span>
        </div>
        <div style={styles.date}>
          <span style={styles.dateText} id={dateId}></span>
        </div>
        <div
          className={'hover-text'}
          style={styles.increaseDay}
          onClick={() => redraw(1440)}
        >
          <span style={styles.arrow}>&rsaquo;</span>
        </div>
        <div
          className={'hover-text'}
          style={styles.increaseMonth}
          onClick={() => redraw(43200)}
        >
          <span style={styles.arrow}>&rsaquo;</span>
          <span style={styles.arrow}>&rsaquo;</span>
        </div>
      </div>
    </div>
  );
};

WorldDaylightMap.defaultProps = defaultProps;

export default WorldDaylightMap;
