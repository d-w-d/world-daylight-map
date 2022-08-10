import { ILatLng } from './ILatLng';

/**
 *
 */
export interface IIcon {
  iconLabel: string;
  iconCoord: ILatLng;
  iconUrl: string;
  iconToSvgWidthRatio?: number;
  iconWidth?: number;
  iconHeight?: number;
  iconLink?: string;
}
