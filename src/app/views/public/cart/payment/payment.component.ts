import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-payment',
  imports: [RouterLink],
  templateUrl: './payment.component.html',
})
export class PaymentComponent {



// dans la classe :
private router = inject(Router);

constructor() {
  // si le client arrive ici sans avoir rempli la livraison
  if (this.cart.items().length && !this.cart.customer()) {
    this.router.navigate(['/commande']);
  }
}


  cart = inject(CartService);

  // À remplacer par vos vrais numéros
  private whatsapp = '221000000000';

  methods = [
    { id: 'wave', label: 'Wave', qr: 'images/qr-wave.png', phone: '77 000 00 00', owner: 'Adaastor' },
    { id: 'orange', label: 'Orange Money', qr: 'images/qr-orange-money.png', phone: '77 000 00 00', owner: 'Adaastor' },
  ];

  selectedId = signal('wave');
  selected = computed(() => this.methods.find(m => m.id === this.selectedId())!);
  copied = signal(false);
  orderId = signal<string | null>(null);

  copy(text: string) {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  

  confirmPayment() {
  const id = 'AD-' + Date.now().toString().slice(-6);
  const c = this.cart.customer();
  const lines = this.cart.items().map(i => `- ${i.quantity} x ${i.product.name}`).join('\n');

  const msg =
    `Bonjour, je viens de payer ma commande ${id} par ${this.selected().label}.\n\n` +
    `${lines}\n\nTotal : ${this.cart.total().toLocaleString('fr-FR')} FCFA\n\n` +
    (c
      ? `Livraison :\n${c.prenom} ${c.nom} - ${c.telephone}\n${c.adresse}, ${c.quartier}, ${c.ville}\n` +
        (c.instructions ? `Instructions : ${c.instructions}\n` : '') + '\n'
      : '') +
    `Voici ma capture de paiement :`;

  window.open(`https://wa.me/${this.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  this.orderId.set(id);
  this.cart.clear();
  this.cart.customer.set(null);
}
}