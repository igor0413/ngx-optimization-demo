import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';

@Component({
  selector: 'app-version-2',
  template: `
    <h1>Variant 2</h1>
    <table>
      <tbody
        dnd-droppable
        (onDropSuccess)="dropSuccess($event)"
        (onDragEnter)="dragEnter($event)"
        (onDragLeave)="dragLeave($event)"
      >
        <tr *ngFor="let row of table">
          <td *ngFor="let cell of row">
            <span
              class="item"
              *ngFor="let item of cell"
              dnd-draggable
              [dragData]="{cell: cell, item: item}"
              (onDragEnd)="dragEnd($event)"
            >{{item}}</span>
            <span class="entered" *ngIf="cell.entered">{{cell.entered}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: []
})
export class Version2Component implements OnInit {
  public table: ITable = [];
  constructor(private tableService: TableService) { }
  ngOnInit() { this.tableService.subscribe(table => this.table = table); }

  private enteredCell: ICell;

  private getCell(element: Element): ICell {
      const td = element.closest('td');
      const tr = element.closest('tr');
      const body = element.closest('tbody');
      const row = body ? Array.from(body.children).indexOf(tr) : -1;
      const col = tr ? Array.from(tr.children).indexOf(td) : -1;
      return (row >= 0 && col >= 0) ? this.table[row][col] : null;
  }

  private clearEnteredCell() {
    if (this.enteredCell) {
        delete this.enteredCell.entered;
        delete this.enteredCell;
    }
  }

  public dropSuccess({ dragData, mouseEvent }: {dragData: any, mouseEvent: DragEvent}) {
    const index = dragData.cell.indexOf(dragData.item);
    if (index >= 0) {
      dragData.cell.splice(index, 1);
    }
    if (this.enteredCell) {
      this.enteredCell.push(dragData.item);
    }
    this.clearEnteredCell();
  }

  public dragEnter({ dragData, mouseEvent }: {dragData: any, mouseEvent: DragEvent}) {
    this.clearEnteredCell();
    const cell = this.getCell(mouseEvent.toElement);
    if (cell) {
      cell.entered = dragData.item;
      this.enteredCell = cell;
    }
  }

  public dragLeave({ dragData, mouseEvent }: {dragData: any, mouseEvent: DragEvent}) {
    if (!mouseEvent.fromElement || !mouseEvent.fromElement.closest('td')) {
      this.clearEnteredCell();
    }
  }

  public dragEnd() {
    this.clearEnteredCell();
  }

}
