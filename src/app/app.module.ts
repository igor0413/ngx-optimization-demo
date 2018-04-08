import { BrowserModule, EventManager } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DndModule } from 'ng2-dnd';

import { ROUTES } from './routes';

import { AppComponent } from './app.component';
import { Version1Component } from './version-1.component';
import { Version2Component } from './version-2.component';
import { Version3Component } from './version-3.component';
import { Version4Component, Version4CellComponent } from './version-4.component';
import { Version5Component, Version5CellComponent } from './version-5.component';

import { TableService } from './table.service';
import { DndStorageService } from './dnd-storage.service';
import { BeforeRenderService } from './before-render.service';

import { OutZoneEventManager } from './out-zone-event-manager';

@NgModule({
  declarations: [
    AppComponent,
    Version1Component,
    Version2Component,
    Version3Component,
    Version4Component,
    Version4CellComponent,
    Version5Component,
    Version5CellComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
    DndModule.forRoot(),
  ],
  providers: [
    TableService,
    DndStorageService,
    BeforeRenderService,
    { provide: EventManager, useClass: OutZoneEventManager },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
