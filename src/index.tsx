import React, { useEffect, useState } from 'react';
import { IIcon } from './models';

import { useStyles } from './styles';
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
  //
  // Merge supplied options with default values
  const options: IProps['options'] = {
    ...defaultProps.options,
    ...(!!props ? props.options : {}),
  };
  const { isSunshineDisplayed, icons } = options;

  //
  //
  // Define stateful params
  const [worldDaylightMap] = useState<WDMG>(
    new WDMG({ isSunshineDisplayed, icons })
  );
  const [fontScaleFactor, setFontScaleFactor] = useState(1);

  //
  //
  // Get Styles
  const classes = useStyles(options, fontScaleFactor)();

  //
  //
  // Initialize svg with unique id
  useEffect(() => {
    worldDaylightMap.init();
  }, [worldDaylightMap]);

  //
  //
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
      ref={el => {
        //
        //
        // When the container's width is established, use it to calc fontScaleFactor
        if (!!el && !!el.clientWidth) {
          const containerWidth = el.clientWidth;
          worldDaylightMap.setContainerWidth(containerWidth);
          let fsf = containerWidth / 1200;
          setFontScaleFactor(fsf);
        }
      }}
    >
      <svg id={worldDaylightMap.getSvgId()} />
      <div className={classes.controls + ' ' + controlsPositionClass}>
        <div className={classes.timezoneLabel}>
          <span
            className={classes.timezoneLabelText}
            id={worldDaylightMap.getTimezoneTextId()}
          ></span>
        </div>
        <div
          className={classes.decreaseTimezone + ' ' + classes.arrowWrapper}
          onClick={() => worldDaylightMap.redrawAll(-60)}
        >
          <span className={classes.arrow}>&rsaquo;</span>
        </div>
        <div className={classes.time}>
          <span
            className={classes.timeText}
            id={worldDaylightMap.getTimeTextId()}
          ></span>
        </div>
        <div
          className={classes.increaseTimezone + ' ' + classes.arrowWrapper}
          onClick={() => worldDaylightMap.redrawAll(60)}
        >
          <span className={classes.arrow}>&lsaquo;</span>
        </div>
        <div
          className={classes.decreaseMonth + ' ' + classes.arrowWrapper}
          onClick={() => worldDaylightMap.redrawAll(-43200)}
        >
          <span className={classes.arrow}>&lsaquo;</span>
          <span className={classes.arrow}>&lsaquo;</span>
        </div>
        <div
          className={classes.decreaseDay + ' ' + classes.arrowWrapper}
          onClick={() => worldDaylightMap.redrawAll(-1440)}
        >
          <span className={classes.arrow}>&lsaquo;</span>
        </div>
        <div className={classes.date}>
          <span
            className={classes.dateText}
            id={worldDaylightMap.getDateTextId()}
          ></span>
        </div>
        <div
          className={classes.increaseDay + ' ' + classes.arrowWrapper}
          onClick={() => worldDaylightMap.redrawAll(1440)}
        >
          <span className={classes.arrow}>&rsaquo;</span>
        </div>
        <div
          className={classes.increaseMonth + ' ' + classes.arrowWrapper}
          onClick={() => worldDaylightMap.redrawAll(43200)}
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
