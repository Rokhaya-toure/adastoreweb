import type { SafeResourceUrl } from '@angular/platform-browser';

export interface Product {
  id: number;
  name: string;
  short: string;
  price: number;        // en FCFA
  oldPrice?: number;
  category: string;
  emoji: string;        // provisoire
  image?: string;       // image principale (carte produit)
  images?: string[];    // galerie : photos supplémentaires
  video?: string;       // ID public Cloudinary de la vidéo (sans extension)
  videoEmbed?: string;  // ID public Cloudinary, pour utiliser le lecteur Cloudinary à la place
  isNew?: boolean;
  sales: number;
  inStock?: boolean;
}

export interface ProductMedia {
  type: 'image' | 'video' | 'embed';
  src: string;
  safeSrc?: SafeResourceUrl;
  poster?: string;      // miniature
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  emoji: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  adresse: string;
  ville: string;
  quartier: string;
  instructions: string;
}