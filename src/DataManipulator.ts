// File: src/DataManipulator.ts

import { ServerRespond } from './DataStreamer';

export interface Row {
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row[] {
    const stockA = serverResponds.find(el => el.stock === 'ABC');
    const stockB = serverResponds.find(el => el.stock === 'DEF');

    const priceA = stockA && stockA.top_ask ? stockA.top_ask.price : 0;
    const priceB = stockB && stockB.top_ask ? stockB.top_ask.price : 0;

    const ratio = priceA / priceB;

    const upper_bound = 1 + 0.05;
    const lower_bound = 1 - 0.05;

    const trigger_alert = (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined;

    return [{
      ratio,
      timestamp: new Date(serverResponds[0].timestamp),
      upper_bound,
      lower_bound,
      trigger_alert,
    }];
  }
}
