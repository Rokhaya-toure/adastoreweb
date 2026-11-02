import { Routes } from '@angular/router';
import { HomeComponent } from './views/acceuill/home/home.component';
import { ShopComponent } from './views/public/shop/shop.component';
import { ProductDetailsComponent } from './views/public/product-details/product-details.component';
import { CartComponent } from './views/public/cart/cart.component';
import { CheckoutComponent } from './views/public/checkout/checkout.component';
import { PaymentComponent } from './views/public/cart/payment/payment.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
// import { guardActivateGuard } from './guards/guard-activate.guard'; // à réactiver avec le backend

export const routes: Routes = [



    {path: '', component: ClientLayoutComponent, children: [

          { path: '', component: HomeComponent },
  { path: 'boutique', component: ShopComponent },
  { path: 'produit/:id', component: ProductDetailsComponent },
  { path: 'panier', component: CartComponent },
  { path: 'commande', component: CheckoutComponent },
  { path: 'paiement', component: PaymentComponent },

  ]
    },


  {
    path: 'admin',
    // canActivate: [guardActivateGuard],
    // loadChildren: () =>
    //   import('./views/admin/admin.routes').then(m => m.ADMIN_ROUTES),

    loadChildren: () =>
  import('./views/admin/admin-routing').then(m => m.ADMIN_ROUTES),
    
  },

  // Toujours en dernier
  { path: '**', redirectTo: '' },
];