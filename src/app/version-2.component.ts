import { Component } from '@angular/core';
import { VersionBase } from './version-base';
import { Cell } from './table.service';

@Component({
  selector: 'app-version-2',
  template: `
    <h1>{{title}}</h1>
    <table>
      <tbody
        dnd-droppable
        (onDropSuccess)="drop($event)"
        (onDragEnter)="dragEnter($event)"
        (onDragLeave)="dragLeave($event)"
      >
        <tr *ngFor="let row of table">
          <td *ngFor="let cell of row">
            <div class="cell-content">
              <span
                class="item"
                *ngFor="let item of cell"
                dnd-draggable
                [dragData]="{cell: cell, item: item}"
                (onDragEnd)="dragEnd($event)"
              >{{item}}</span>
              <span class="entered" *ngIf="cell.entered">{{cell.entered}}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class Version2Component extends VersionBase {
  public static readonly title = 'Один droppable элемент';

  // Ячейка над которой находится курсор с данными
  private enteredCell: Cell;

  // Поиск элемента на котором сработало событие
  private getTargetElement(target: EventTarget): Element {
    return (target instanceof Element) ? target
      : (target instanceof Text) ? target.parentElement
      : null;
  }

  // Поиск данных ячейки по элементу
  private getCell(element: Element): Cell {
    if (!element) { return null; }
    const td = element.closest('td');
    const tr = element.closest('tr');
    const body = element.closest('tbody');
    const row = body ? Array.from(body.children).indexOf(tr) : -1;
    const col = tr ? Array.from(tr.children).indexOf(td) : -1;
    return (row >= 0 && col >= 0) ? this.table[row][col] : null;
  }

  // Сброс состояния активной ячейки
  private clearEnteredCell() {
    if (this.enteredCell) {
      delete this.enteredCell.entered;
      delete this.enteredCell;
    }
  }

  // Курсор с данными был наведен на элемент таблицы
  public dragEnter({ dragData, mouseEvent }: { dragData: any, mouseEvent: DragEvent }) {
    this.clearEnteredCell();
    const element = this.getTargetElement(mouseEvent.target);
    const cell = this.getCell(element);
    if (cell) {
      cell.entered = dragData.item;
      this.enteredCell = cell;
    }
  }

  // Курсор с данными покинул элемент таблицы
  public dragLeave({ dragData, mouseEvent }: { dragData: any, mouseEvent: DragEvent }) {
    const element = this.getTargetElement(mouseEvent.target)
    if (!element || !element.closest('td')) {
      this.clearEnteredCell();
    }
  }

  // На элемент таблицы положили данные
  public drop({ dragData, mouseEvent }: { dragData: any, mouseEvent: DragEvent }) {
    if (this.enteredCell) {
      const index = dragData.cell.indexOf(dragData.item);
      dragData.cell.splice(index, 1);
      this.enteredCell.push(dragData.item);
    }
    this.clearEnteredCell();
  }

  // Перетаскивание завершено
  public dragEnd() {
    this.clearEnteredCell();
  }
}
