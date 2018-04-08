import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { ROUTES } from './routes';
import { TableService } from './table.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="menu">
      <h3>Меню</h3>
      <ul class="navigation">
        <li *ngFor="let router of routes">
          <a [routerLink]="router.path" routerLinkActive="active">{{router.title}}</a>
        </li>
      </ul>
    </nav>
    <div class="rows-cols-form">
      <h3>Параметры таблицы</h3>
      <div>
        <label>Количество строк</label>
        <input type="number" step="100" [(ngModel)]="rows" (input)="table.rows.next(rows)"/>
      </div>
      <div>
        <label>Количество столбцов</label>
        <input type="number" step="1" [(ngModel)]="cols" (input)="table.cols.next(cols)"/>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  public routes = ROUTES
    .filter(x => x.data && x.data.title)
    .map(x => ({ path: x.path, title: x.data.title }));

  public rows: number = 100;
  public cols: number = 10;

  constructor(
    public table: TableService
  ) {}

  ngOnInit() {
    this.table.rows.next(this.rows);
    this.table.cols.next(this.cols);
  }
}
