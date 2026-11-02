import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  cart = inject(CartService);
  private fb = inject(FormBuilder);

  // Numéro WhatsApp au format international, sans "+" ni espaces
  private readonly WHATSAPP_NUMBER = '221781359476'; // 👈 À REMPLACER par votre numéro

  fields = [
    { name: 'nom', label: 'Nom', type: 'text' },
    { name: 'prenom', label: 'Prénom', type: 'text' },
    { name: 'telephone', label: 'Téléphone', type: 'tel' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'adresse', label: 'Adresse', type: 'text' },
    { name: 'ville', label: 'Ville', type: 'text' },
    { name: 'quartier', label: 'Quartier', type: 'text' },
  ];

  form = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    telephone: ['', [Validators.required, Validators.minLength(9)]],
    email: ['', Validators.email],
    adresse: ['', Validators.required],
    ville: ['', Validators.required],
    quartier: [''],
    instructions: [''],
  });

  constructor() {
    const saved = this.cart.customer();
    if (saved) this.form.patchValue(saved); // garde les infos si le client revient en arrière
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.cart.items().length) return;

    const v = this.form.getRawValue();
    this.cart.customer.set(v);

    const fmt = (n: number) => n.toLocaleString('fr-FR');

    const articles = this.cart
      .items()
      .map(i => `• ${i.quantity} × ${i.product.name} : ${fmt(i.product.price * i.quantity)} FCFA`)
      .join('\n');

    const livraison = this.cart.shipping()
      ? `${fmt(this.cart.shipping())} FCFA`
      : 'Offerte';

    const adresse = [v.adresse, v.quartier, v.ville].filter(Boolean).join(', ');

    const message =
`🛍️ *Nouvelle commande*

*Articles*
${articles}

*Livraison* : ${livraison}
*Total* : ${fmt(this.cart.total())} FCFA

*Client*
Nom : ${v.prenom} ${v.nom}
Téléphone : ${v.telephone}${v.email ? `\nEmail : ${v.email}` : ''}

*Adresse de livraison*
${adresse}${v.instructions ? `\n\n*Instructions* : ${v.instructions}` : ''}

Paiement : à confirmer sur WhatsApp`;

    const url = `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Plus fiable que window.open sur mobile (Safari iOS bloque les popups)
    window.location.href = url;
  }
}