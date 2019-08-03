import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'books',
        children: [
          { path: '', loadChildren: '../books-list/books-list.module#BooksListPageModule' },
        ]
      },
      {
        path: 'disks',
        children: [
          { path: '', loadChildren: '../disks-list/disks-list.module#DisksListPageModule' },
        ]
      },
      { path: '', redirectTo: 'books', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'books', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsRoutingModule {}
