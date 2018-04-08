import { Injectable } from '@angular/core';
import { Cell } from './table.service';

@Injectable()
export class DndStorageService {

  public cell: Cell;
  public item: string;
  public isDropped: boolean = false;

  constructor() {}

  set(cell: Cell, item: string) {
    this.cell = cell;
    this.item = item;
    this.dropped(false);
  }

  reset() {
    this.set(null, null);
  }

  dropped(value: boolean = true) {
    this.isDropped = value;
  }
}
