import { Routes } from '@angular/router';
// import { adminGuard } from './admin.guard'; // à réactiver quand le backend gère l'authentification

const placeholder = (path: string, title: string) => ({
  path,
  data: { title },
  loadComponent: () => import('./placeholder/placeholder.component').then(m => m.AdminPlaceholderComponent),
});

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    // canActivate: [adminGuard],
    loadComponent: () => import('./layout/layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.AdminDashboardComponent),
      },
      placeholder('commandes', 'Commandes'),
      placeholder('paiements', 'Paiements'),
      placeholder('produits', 'Produits'),
      placeholder('categories', 'Catégories'),
      placeholder('stocks', 'Stocks'),
      placeholder('promotions', 'Promotions'),
      placeholder('clients', 'Clients'),
      placeholder('livraisons', 'Livraisons'),
      placeholder('avis', 'Avis clients'),
      placeholder('contenu', 'Contenu du site'),
      placeholder('parametres', 'Paramètres'),
      placeholder('utilisateurs', 'Utilisateurs et sécurité'),
    ],
  },
];