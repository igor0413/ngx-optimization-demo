import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

export class Cell extends Array<string> {
  public entered: string;
}

export class Row extends Array<Cell> {
}

export class Table extends Array<Row> {
}

@Injectable()
export class TableService {

  public rows: BehaviorSubject<number> = new BehaviorSubject(0);
  public cols: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {}

  public generateTable(rows: number, cols: number): Table {
    const table = new Table();
    for (let row = 0; row < rows; row++) {
      table[row] = new Row();
      for (let col = 0; col < cols; col++) {
        table[row][col] = new Cell();
        table[row][col].push(`${row + 1} × ${col + 1}`);
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
