import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./shared/services/auth.guard";

const routes: Routes = [
    {
        path: 'main',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    },
    {
        path: 'shop',
        loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'cart',
        loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
        canActivate: [AuthGuard]
    },

    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    },

    {
        path: 'registration',
        loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule),
    },
    {
        path: 'not-found',
        loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule),

    },
    {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then(m=>m.AccountModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    },

    {
        path: '**',
        loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule),
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
