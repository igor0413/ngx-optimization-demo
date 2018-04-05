import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';

@Component({
  selector: 'app-root',
  template: `
    <ul class="navigation">
      <li><a [routerLink]="['/v1']">Version 1</a></li>
      <li><a [routerLink]="['/v2']">Version 2</a></li>
    </ul>
    <div>
      <p>
        <label>
          rows
          <input type="number" step="100" [(ngModel)]="rows" (input)="table.rows.next(rows)"/>
        </label>
      </p>
      <p>
        <label>
          cols
          <input type="number" step="1" [(ngModel)]="cols" (input)="table.cols.next(cols)"/>
        </label>
      </p>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  rows: number = 100;
  cols: number = 10;

  constructor(public table: TableService) {}

  ngOnInit() {
    this.table.rows.next(this.rows);
    this.table.cols.next(this.cols);
  }
}
