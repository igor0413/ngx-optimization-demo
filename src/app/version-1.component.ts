import { Component } from '@angular/core';
import { VersionBase } from './version-base';
import { Cell } from './table.service';

@Component({
  selector: 'app-version-1',
  template: `
    <h1>{{title}}</h1>
    <table>
      <tbody>
        <tr *ngFor="let row of table">
          <td *ngFor="let cell of row">
            <div
              class="cell-content"
              dnd-droppable
              (onDropSuccess)="drop($event, cell)"
              (onDragEnter)="dragEnter($event, cell)"
              (onDragLeave)="dragLeave($event, cell)"
            >
              <span
                class="item"
                *ngFor="let item of cell"
                dnd-draggable
                [dragData]="{cell: cell, item: item}"
              >{{item}}</span>
              <span class="entered" *ngIf="cell.entered">{{cell.entered}}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class Version1Component extends VersionBase {
  public static readonly title = 'Наивная реализация';

  // Курсор с данными был наведен на ячейку
  public dragEnter({ dragData }, cell: Cell) {
    cell.entered = dragData.item;
  }

  // Курсор с данными покинул ячейку
  public dragLeave({ dragData }, cell: Cell) {
    delete cell.entered;
  }

  // В ячейку положили данные
  public drop({ dragData }, cell: Cell) {
    const index = dragData.cell.indexOf(dragData.item);
    dragData.cell.splice(index, 1);
    cell.push(dragData.item);
    delete cell.entered;
  }
}
