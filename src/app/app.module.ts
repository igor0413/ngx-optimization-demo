import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { Version1Component } from './version-1.component';
import { TableService } from './table.service';


const routes: Routes = [
  { path: '', redirectTo: 'v1', pathMatch: 'full' },
  { path: 'v1', component: Version1Component },
]


@NgModule({
  declarations: [
    AppComponent,
    Version1Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    DndModule.forRoot(),
  ],
  providers: [TableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
