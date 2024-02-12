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
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
