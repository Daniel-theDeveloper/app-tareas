import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },  {
    path: 'create-task',
    loadChildren: () => import('./pages/create-task/create-task.module').then( m => m.CreateTaskPageModule)
  },
  {
    path: 'edit-task',
    loadChildren: () => import('./pages/edit-task/edit-task.module').then( m => m.EditTaskPageModule)
  },
  {
    path: 'tap4',
    loadChildren: () => import('./tap4/tap4.module').then( m => m.Tap4PageModule)
  },
  {
    path: 'details-task',
    loadChildren: () => import('./pages/details-task/details-task.module').then( m => m.DetailsTaskPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
