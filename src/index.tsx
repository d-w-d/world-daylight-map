import React, { useEffect, useRef, useState } from 'react';
import { IIcon } from './models';

import { useStyles } from './styles';
import { simpleUID } from './utils';
import { WorldDaylightMapGen as WDMG } from './WorldDaylightMapGen';

export type TControlsPosition =
  | 'outer-top'
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'no-controls';

export interface IProps {
  options: {
    //
    // Settings passed to styles.ts
    //
    width?: number | string;
    height?: number | string;
    controlsPosition?: TControlsPosition;
    font?: string;
    fontSize?: number | string;
    controlsScale?: number;
    //
    // Settings passed to WorldDaylightMapGen.ts
    //
    isSunshineDisplayed?: boolean;
    icons?: IIcon[];
  };
}

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

export type Options = Partial<IProps['options']>;

export const WorldDaylightMap = (props: Partial<IProps> = defaultProps) => {
  //
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
  const [containerWidth, setContainerWidth] = useState<number>();
  const [fontScaleFactor, setFontScaleFactor] = useState(1);

  // Define callbacks
  const redraw = (dMins: number) =>
    !!worldDaylightMap && worldDaylightMap.redrawAll(dMins);

  // Get Styles
  const classes = useStyles(options, fontScaleFactor)();

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
    if (!!containerWidth && !!worldDaylightMap) {
      worldDaylightMap.setContainerWidth(containerWidth);
      let fsf = containerWidth / 1200;
      setFontScaleFactor(fsf);
    }
  }, [containerWidth, worldDaylightMap]);

  // Determine controlsPositionClass based on controlsPosition input
  const { controlsPosition } = options;
  let controlsPositionClass = classes.controlsPositionTop;
  switch (controlsPosition) {
    case 'outer-top':
      controlsPositionClass = classes.controlsPositionOuterTop;
      break;
    case 'top-left':
      controlsPositionClass = classes.controlsPositionTopLeft;
      break;
    case 'top-right':
      controlsPositionClass = classes.controlsPositionTopRight;
      break;
    case 'bottom':
      controlsPositionClass = classes.controlsPositionBottom;
      break;
    case 'bottom-left':
      controlsPositionClass = classes.controlsPositionBottomLeft;
      break;
    case 'bottom-right':
      controlsPositionClass = classes.controlsPositionBottomRight;
      break;
    case 'no-controls':
      controlsPositionClass = classes.controlsPositionNoControls;
      break;
  }

  return (
    <div
      className={classes.container}
      ref={el => !!el && !!el.clientWidth && setContainerWidth(el.clientWidth)}
    >
      <svg id={svgId} />
      <div className={classes.controls + ' ' + controlsPositionClass}>
        <div className={classes.timezoneLabel}>
          <span className={classes.timezoneLabelText} id={timezoneId}></span>
        </div>
        <div
          className={classes.decreaseTimezone + ' ' + classes.arrowWrapper}
          onClick={() => redraw(-60)}
        >
          <span className={classes.arrow}>&rsaquo;</span>
        </div>
        <div className={classes.time}>
          <span className={classes.timeText} id={timeId}></span>
        </div>
        <div
          className={classes.increaseTimezone + ' ' + classes.arrowWrapper}
          onClick={() => redraw(60)}
        >
          <span className={classes.arrow}>&lsaquo;</span>
        </div>
        <div
          className={classes.decreaseMonth + ' ' + classes.arrowWrapper}
          onClick={() => redraw(-43200)}
        >
          <span className={classes.arrow}>&lsaquo;</span>
          <span className={classes.arrow}>&lsaquo;</span>
        </div>
        <div
          className={classes.decreaseDay + ' ' + classes.arrowWrapper}
          onClick={() => redraw(-1440)}
        >
          <span className={classes.arrow}>&lsaquo;</span>
        </div>
        <div className={classes.date}>
          <span className={classes.dateText} id={dateId}></span>
        </div>
        <div
          className={classes.increaseDay + ' ' + classes.arrowWrapper}
          onClick={() => redraw(1440)}
        >
          <span className={classes.arrow}>&rsaquo;</span>
        </div>
        <div
          className={classes.increaseMonth + ' ' + classes.arrowWrapper}
          onClick={() => redraw(43200)}
        >
          <span className={classes.arrow}>&rsaquo;</span>
          <span className={classes.arrow}>&rsaquo;</span>
        </div>
      </div>
    </div>
  );
};

WorldDaylightMap.defaultProps = defaultProps;

export default WorldDaylightMap;
