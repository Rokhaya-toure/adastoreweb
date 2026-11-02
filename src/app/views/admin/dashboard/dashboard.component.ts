import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminDataService } from '../../../core/services/adminedataservice.service';
import {
  METHOD_LABELS, Order, PAYMENT_STATUS_LABELS, PAYMENT_STATUS_STYLES,
  STATUS_LABELS, STATUS_STYLES, fcfa,
} from '../../../core/models/order';

@Component({
  selector: 'app-admin-dashboard',
  imports: [DatePipe, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class AdminDashboardComponent {
  data = inject(AdminDataService);

  fcfa = fcfa;
  methods = METHOD_LABELS;
  statusLabels = STATUS_LABELS;
  statusStyles = STATUS_STYLES;
  payLabels = PAYMENT_STATUS_LABELS;
  payStyles = PAYMENT_STATUS_STYLES;

  today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  shown = computed(() => this.data.paymentsToVerify().slice(0, 5));

  recent = computed(() =>
    [...this.data.orders()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6));

  lowStock = computed(() =>
    this.data.products().filter(p => p.stock <= 5).sort((a, b) => a.stock - b.stock));

  kpis = computed(() => {
    const since = Date.now() - 30 * 86_400_000;
    const paid = this.data.orders().filter(o => o.paymentStatus === 'received' && new Date(o.createdAt).getTime() >= since);
    const out = this.data.products().filter(p => p.stock === 0).length;
    const low = this.data.products().filter(p => p.stock > 0 && p.stock <= 5).length;
    return [
      { label: 'Chiffre d’affaires encaissé', value: fcfa(paid.reduce((s, o) => s + o.total, 0)), hint: '30 derniers jours', alert: false },
      { label: 'Ventes confirmées', value: String(paid.length), hint: 'Paiement reçu', alert: false },
      { label: 'Commandes en attente', value: String(this.data.pendingOrdersCount()), hint: 'À traiter', alert: false },
      { label: 'Produits en rupture', value: String(out), hint: low + ' en stock faible', alert: out > 0 },
    ];
  });

  private daily = computed(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - (6 - i));
      return d;
    });
    return days.map(d => ({
      date: d,
      total: this.data.orders()
        .filter(o => o.status !== 'cancelled' && new Date(o.createdAt).toDateString() === d.toDateString())
        .reduce((s, o) => s + o.total, 0),
    }));
  });

  weekTotal = computed(() => this.daily().reduce((s, d) => s + d.total, 0));

  chart = computed(() => {
    const days = this.daily();
    const max = Math.max(...days.map(d => d.total), 1);
    const barW = 48, gap = (560 - 7 * barW) / 8, base = 160, maxH = 125;
    return days.map((d, i) => {
      const h = d.total ? Math.max((d.total / max) * maxH, 4) : 0;
      return {
        x: gap + i * (barW + gap),
        y: base - h,
        h,
        today: i === 6,
        text: d.total ? Math.round(d.total / 1000) + ' k' : '',
        label: d.date.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', ''),
      };
    });
  });

  verify(o: Order) {
    const ok = window.confirm(
      `Avez-vous bien reçu ${fcfa(o.total)} sur ${METHOD_LABELS[o.method]} pour la commande ${o.ref} ?`);
    if (ok) this.data.confirmPayment(o.id);
  }

  waiting(o: Order) {
    const h = Math.floor((Date.now() - new Date(o.createdAt).getTime()) / 3_600_000);
    if (h < 1) return 'il y a moins d’1 h';
    return h < 24 ? `il y a ${h} h` : `il y a ${Math.floor(h / 24)} j`;
  }

  whatsapp(o: Order) {
    const digits = o.phone.replace(/\D/g, '');
    const phone = digits.startsWith('221') ? digits : '221' + digits;
    const msg = `Bonjour ${o.customer.split(' ')[0]}, c'est Adastor à propos de votre commande ${o.ref}.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }
}