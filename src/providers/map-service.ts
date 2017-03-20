import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MapService {

  constructor(public http: Http) {
    console.log('Hello MapService Provider');
  }

  /**
   * Adapted from: http://gis.stackexchange.com/questions/172554/calculating-bounding-box-of-given-set-of-coordinates-from-leaflet-draw
   * Input coords format [[lat1, lng1], [lat2, lng2], ...]
   * Output coords format: [[minLat, minLng], [maxLat, maxLng]]
   */
  private calculateBoundingBox(coords) {
    var lats = []; var lngs = []; 
    for (var i = 0; i < coords.length; i++)  {
        lats.push(coords[i][0]);
        lngs.push(coords[i][1]);
    }

    // calc the min and max lng and lat
    var minlat = Math.min.apply(null, lats),
        maxlat = Math.max.apply(null, lats);
    var minlng = Math.min.apply(null, lngs),
        maxlng = Math.max.apply(null, lngs);

    // create a bounding rectangle that can be used in leaflet
    return [[minlat,minlng],[maxlat,maxlng]];
  }

  private getNESW(bb) {
    const nesw = {
      southwest: {
        lat: bb[0][0],
        lng: bb[0][1]
      },
      northeast: {
        lat: bb[1][0],
        lng: bb[1][1]
      }
    };
    return nesw;
  }
  
  private getCoordsFromPoints(pointList) {
    const coords:any[] = [];
    for(let i = 0; i < pointList.length; i++) {
      let point = pointList[i];
      coords.push([point.lat, point.lng]);
    }
    return coords;
  }

  /**
   * http://stackoverflow.com/questions/6048975/google-maps-v3-how-to-calculate-the-zoom-level-for-a-given-bounds
   * http://jsfiddle.net/john_s/BHHs8/6/
   */
  public getBoundsZoomLevel(points:any[], mapDim) {
    var WORLD_DIM = { height: 256, width: 256 };
    var ZOOM_MAX = 21;

    function latRad(lat) {
        var sin = Math.sin(lat * Math.PI / 180);
        var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }
    const boundCoords = this.getCoordsFromPoints(points);
    const bb = this.calculateBoundingBox(boundCoords);
    const nesw = this.getNESW(bb);
    var ne = nesw.northeast;
    var sw = nesw.southwest;

    var latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;
    var lngDiff = ne.lng - sw.lng;
    var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
    var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);
    return Math.min(latZoom, lngZoom, ZOOM_MAX);
  }
}
