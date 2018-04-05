import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';

@Component({
  selector: 'app-version-3',
  template: `
    <h1>Variant 3</h1>
    <table>
      <tbody
        (dragenter)="dragEnter($event)"
        (dragleave)="dragLeave($event)"
        (dragover)="dragOver($event)"
        (drop)="drop($event)"
      >
        <tr *ngFor="let row of table">
          <td *ngFor="let cell of row">
            <span
              class="item"
              *ngFor="let item of cell"
              draggable="true"
              (dragstart)="dragStart($event)"
              (dragend)="dragEnd($event)"
            >{{item}}</span>
            <span class="entered" *ngIf="cell.entered">{{cell.entered}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: []
})
export class Version3Component implements OnInit {
  public table: ITable = [];
  constructor(private tableService: TableService) { }
  ngOnInit() { this.tableService.subscribe(table => this.table = table); }

  private enteredCell: ICell;
  private dragData: { cell: ICell, item: string };

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

  public dragEnter(event: DragEvent) {
    this.clearEnteredCell();
    const cell = this.getCell(event.toElement);
    if (cell) {
      this.enteredCell = cell;
      this.enteredCell.entered = this.dragData.item;
    }
  }

  public dragLeave(event: DragEvent) {
    if (event.fromElement && !event.fromElement.closest('td')) {
      this.clearEnteredCell();
    }
  }

  public dragOver(event: DragEvent) {
    const cell = this.getCell(event.toElement);
    if (cell) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }
  }

  public drop(event: DragEvent) {
    const cell = this.getCell(event.srcElement);
    event.stopPropagation();
    if (this.dragData && this.enteredCell) {
      const index = this.dragData.cell.indexOf(this.dragData.item);
      this.dragData.cell.splice(index, 1);
      this.enteredCell.push(this.dragData.item);
    }
    this.dragEnd(event);
  }

  public dragStart(event: DragEvent) {
    event.dataTransfer.effectAllowed = 'all';
    const cell = this.getCell(event.srcElement);
    const item = event.srcElement.textContent;
    this.dragData = { cell, item };
    this.clearEnteredCell();
  }

  public dragEnd(event: DragEvent) {
    delete this.dragData;
    this.clearEnteredCell();
  }

}
