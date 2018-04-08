import { Component } from '@angular/core';
import { VersionBase } from './version-base';
import { Cell } from './table.service';

@Component({
  selector: 'app-version-3',
  template: `
    <h1>{{title}}</h1>
    <table>
      <tbody
        (dragenter)="dragEnter($event)"
        (dragleave)="dragLeave($event)"
        (dragover)="dragOver($event)"
        (drop)="drop($event)"
      >
        <tr *ngFor="let row of table">
          <td *ngFor="let cell of row">
            <div class="cell-content">
              <span
                class="item"
                *ngFor="let item of cell"
                draggable="true"
                (dragstart)="dragStart($event, {cell: cell, item: item})"
                (dragend)="dragEnd()"
              >{{item}}</span>
              <span class="entered" *ngIf="cell.entered">{{cell.entered}}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class Version3Component extends VersionBase {
  public static readonly title = 'Нативные события';

  // Ячейка над которой находится курсор с данными
  private enteredCell: Cell;
  // Перетаскиваемые данные
  private dragData: { cell: Cell, item: string };

  // Поиск элемента, над которым сработало событие
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

  // Начало перетаскивания
  public dragStart(event: DragEvent, dragData) {
    this.dragData = dragData;
    event.dataTransfer.effectAllowed = 'all';
    event.dataTransfer.setData('Text', dragData.item);
  }

  // Курсор с данными был наведен на элемент таблицы
  public dragEnter(event: DragEvent) {
    this.clearEnteredCell();
    const element = this.getTargetElement(event.target);
    const cell = this.getCell(element);
    if (cell) {
      this.enteredCell = cell;
      this.enteredCell.entered = this.dragData.item;
    }
  }

  // Курсор с данными покинул элемент таблицы
  public dragLeave(event: DragEvent) {
    const element = this.getTargetElement(event.target);
    if (!element || !element.closest('td')) {
      this.clearEnteredCell();
    }
  }

  // Курсор с данными находится над элементом таблицы
  public dragOver(event: DragEvent) {
    const element = this.getTargetElement(event.target);
    const cell = this.getCell(element);
    if (cell) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      return false;
    }
  }

  // На элемент таблицы положили данные
  public drop(event: DragEvent) {
    const element = this.getTargetElement(event.target);
    event.stopPropagation();
    if (this.dragData && this.enteredCell) {
      const index = this.dragData.cell.indexOf(this.dragData.item);
      this.dragData.cell.splice(index, 1);
      this.enteredCell.push(this.dragData.item);
    }
    this.dragEnd();
    return false;
  }

  // Перетаскивание завершено
  public dragEnd() {
    delete this.dragData;
    this.clearEnteredCell();
  }
}
