import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren: 'app/root/root.module#RootModule' },
  { path: '**', component: NotFoundComponent },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRouting {
}
