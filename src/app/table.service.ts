import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TableService {

  public rows: BehaviorSubject<number> = new BehaviorSubject(0);
  public cols: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {}

  public generateTable(rows: number, cols: number): ITable {
    const table = [];
    for (let row = 0; row < rows; row++) {
      table[row] = [];
      for (let col = 0; col < cols; col++) {
        table[row][col] = [`cell-${row}x${col}`];
      }
    }
    return table;
  }

  public subscribe(fn) {
    return Observable.combineLatest(this.rows, this.cols).subscribe(([rows, cols]) => {
      fn(this.generateTable(rows, cols));
    });
  }

}
