import { Routes } from "@angular/router";
import { Version1Component } from './version-1.component';
import { Version2Component } from './version-2.component';
import { Version3Component } from './version-3.component';
import { Version4Component } from './version-4.component';
import { Version5Component } from './version-5.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'v1', pathMatch: 'full' },
  { path: 'v1', component: Version1Component, data: { title: Version1Component.title } },
  { path: 'v2', component: Version2Component, data: { title: Version2Component.title } },
  { path: 'v3', component: Version3Component, data: { title: Version3Component.title } },
  { path: 'v4', component: Version4Component, data: { title: Version4Component.title } },
  { path: 'v5', component: Version5Component, data: { title: Version5Component.title } },
];
