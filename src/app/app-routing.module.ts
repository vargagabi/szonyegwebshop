import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
  },
  {
    path: 'shop',
    loadChildren: ()=> import('./pages/shop/shop.module').then(m=>m.ShopModule),
  },
  {
    path: 'cart',
    loadChildren: ()=> import('./pages/cart/cart.module').then(m=>m.CartModule),
  },

  {
    path: 'login',
    loadChildren: ()=> import('./pages/login/login.module').then(m=>m.LoginModule),
  },

  {
    path: 'registration',
    loadChildren: ()=> import('./pages/registration/registration.module').then(m=>m.RegistrationModule),
  },
  {
    path:'not-found',
    loadChildren: ()=> import('./pages/not-found/not-found.module').then(m=>m.NotFoundModule),

  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },

  {
    path: '**',
    loadChildren: ()=> import('./pages/not-found/not-found.module').then(m=>m.NotFoundModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
