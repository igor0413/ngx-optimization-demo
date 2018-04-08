import { Component, HostListener, Input, ElementRef } from '@angular/core';
import { VersionBase } from './version-base';
import { Cell } from './table.service';
import { DndStorageService } from './dnd-storage.service';

@Component({
  selector: 'app-version-4-cell',
  template: `
    <span
      class="item"
      *ngFor="let item of cell"
      draggable="true"
      (dragstart)="dragStart($event, item)"
      (dragend)="dragEnd($event)"
    >{{item}}</span>
    <span class="entered" *ngIf="cell.entered">{{cell.entered}}</span>
  `,
})
export class Version4CellComponent {

  @Input() public cell: Cell;

  private enteredElements: any = [];

  constructor(
    private element: ElementRef,
    private dndStorage: DndStorageService,
  ) {}

  // Начало перетаскивания
  public dragStart(event: DragEvent, item: string) {
    this.dndStorage.set(this.cell, item);
    event.dataTransfer.effectAllowed = 'all';
    event.dataTransfer.setData('Text', item);
  }

  // Курсор с данными был наведен на элемент таблицы
  @HostListener('dragenter', ['$event'])
  private dragEnter(event: DragEvent) {
    this.enteredElements.push(event.target);
    if (this.cell !== this.dndStorage.cell) {
      this.cell.entered = this.dndStorage.item;
    }
  }

  // Курсор с данными покинул элемент таблицы
  @HostListener('dragleave', ['$event'])
  private dragLeave(event: DragEvent) {
    this.enteredElements = this.enteredElements.filter(x => x != event.target);
    if (!this.enteredElements.length) {
      delete this.cell.entered;
    }
  }

  // Курсор с данными находится над элементом таблицы
  @HostListener('dragover', ['$event'])
  private dragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = this.cell.entered ? 'move' : 'none';
    return false;
  }

  // На элемент таблицы положили данные
  @HostListener('drop', ['$event'])
  private drop(event: DragEvent) {
    event.stopPropagation();
    this.cell.push(this.dndStorage.item);
    this.dndStorage.dropped();
    delete this.cell.entered;
    return false;
  }

  // Перетаскивание завершено
  public dragEnd(event: DragEvent) {
    if (this.dndStorage.isDropped) {
      const index = this.cell.indexOf(this.dndStorage.item);
      this.cell.splice(index, 1);
    }
    this.dndStorage.reset();
  }
}

@Component({
  selector: 'app-version-4',
  template: `
    <h1>{{title}}</h1>
    <table>
      <tbody>
        <tr *ngFor="let row of table">
          <td *ngFor="let cell of row">
            <app-version-4-cell class="cell-content" [cell]="cell"></app-version-4-cell>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class Version4Component extends VersionBase {
  public static readonly title = 'Декомпозированные ячейки';
}
