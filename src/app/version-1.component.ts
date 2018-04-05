import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';

@Component({
  selector: 'app-version-1',
  template: `
    <h1>Variant 1</h1>
    <table>
      <tbody>
        <tr *ngFor="let row of table">
          <td
            *ngFor="let cell of row"
            dnd-droppable
            (onDropSuccess)="dropSuccess($event, cell)"
            (onDragOver)="dragOver($event, cell)"
            (onDragEnter)="dragOver($event, cell)"
            (onDragLeave)="dragLeave($event, cell)"
          >
            <span
              class="item"
              *ngFor="let item of cell"
              dnd-draggable
              [dragData]="{cell: cell, item: item}"
            >{{item}}</span>
            <span class="entered" *ngIf="cell.entered">{{cell.entered}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: []
})
export class Version1Component implements OnInit {
  public table: string[][][] = [];
  constructor(private tableService: TableService) { }
  ngOnInit() { this.tableService.subscribe(table => this.table = table); }


  public dropSuccess({ dragData, mouseEvent }, cell) {
    const index = dragData.cell.indexOf(dragData.item);
    if (index >= 0) {
      dragData.cell.splice(index, 1);
    }
    cell.push(dragData.item);
    delete cell.entered;
  }

  public dragOver({ dragData, mouseEvent }, cell) {
    cell.entered = dragData.item;
  }

  public dragLeave({ dragData, mouseEvent }, cell) {
    delete cell.entered;
  }

}
