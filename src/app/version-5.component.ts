import { Component, OnInit, HostListener, Input, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TableService } from './table.service';

const dndService = {
  cell: null,
  item: null,
  isDropped: false,
  set(cell, item) { Object.assign(this, { cell, item, isDropped: false }); },
  reset() { this.set(null, null); },
  drop() { this.isDropped = true; }
};

@Component({
  selector: 'app-version-5-cell',
  template: `
    <span
      class="item"
      *ngFor="let item of cell"
      draggable="true"
      (dragstart)="dragStart($event)"
      (dragend)="dragEnd($event)"
    >{{item}}</span>
    <span class="entered" *ngIf="cell.entered">{{cell.entered}}</span>
  `,
})
export class Version5CellComponent {

  @Input() public cell: ICell;

  private dndService = dndService;

  constructor(
    private element: ElementRef,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  @HostListener('dragenter.out-zone', ['$event'])
  private dragEnter(event: DragEvent) {
    if (this.cell !== this.dndService.cell) {
      this.cell.entered = this.dndService.item;
      this.changeDetector.detectChanges();
    }
  }

  @HostListener('dragleave.out-zone', ['$event'])
  private dragLeave(event: DragEvent) {
    const element = event.fromElement;
    const closest = element && element.closest('app-version-5-cell');
    if (closest !== this.element.nativeElement) {
      delete this.cell.entered;
      this.changeDetector.detectChanges();
    }
  }

  @HostListener('dragover.out-zone', ['$event'])
  private dragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = this.cell.entered ? 'move' : 'none';
  }

  @HostListener('drop', ['$event'])
  private drop(event: DragEvent) {
    event.stopPropagation();
    this.cell.push(this.dndService.item);
    this.dndService.drop();
    delete this.cell.entered;
  }

  public dragStart(event: DragEvent) {
    event.dataTransfer.effectAllowed = 'all';
    const item = event.srcElement.textContent;
    this.dndService.set(this.cell, item);
  }

  public dragEnd(event: DragEvent) {
    if (this.dndService.isDropped) {
      const index = this.cell.indexOf(this.dndService.item);
      this.cell.splice(index, 1);
    }
    this.dndService.reset();
  }
}


@Component({
  selector: 'app-version-5',
  template: `
    <h1>Variant 5</h1>
    <table>
      <tbody>
        <tr *ngFor="let row of table">
          <td *ngFor="let cell of row">
            <app-version-5-cell [cell]="cell"></app-version-5-cell>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class Version5Component implements OnInit {
  public table: ITable = [];
  constructor(private tableService: TableService) { }
  ngOnInit() { this.tableService.subscribe(table => this.table = table); }
}
