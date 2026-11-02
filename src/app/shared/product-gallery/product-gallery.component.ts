import { Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product, ProductMedia } from '../../core/models/product';
import { vid, vidEmbed, vidPoster } from '../../core/data/mock-data';

@Component({
  selector: 'app-product-gallery',
  template: `
    <div class="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
      @if (current(); as m) {
        @if (m.type === 'video') {
          <video [src]="m.src" [poster]="m.poster" controls playsinline preload="metadata"
                 class="h-full w-full bg-black object-contain"></video>
        } @else if (m.type === 'embed') {
          <iframe [src]="m.safeSrc!" class="h-full w-full" frameborder="0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen></iframe>
        } @else {
          <img [src]="m.src" [alt]="product().name" class="h-full w-full object-cover" />
        }
      } @else {
        <div class="flex h-full w-full items-center justify-center text-9xl">{{ product().emoji }}</div>
      }

      @if (media().length > 1) {
        <button type="button" (click)="prev()" aria-label="Média précédent"
                class="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/90 text-xl shadow hover:bg-white">‹</button>
        <button type="button" (click)="next()" aria-label="Média suivant"
                class="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/90 text-xl shadow hover:bg-white">›</button>
        <span class="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white">
          {{ safeIndex() + 1 }} / {{ media().length }}
        </span>
      }
    </div>

    @if (media().length > 1) {
      <div class="mt-3 flex gap-3 overflow-x-auto pb-1">
        @for (m of media(); track m.src; let i = $index) {
          <button type="button" (click)="go(i)"
                  [attr.aria-label]="m.type === 'image' ? 'Voir image ' + (i + 1) : 'Voir la vidéo'"
                  class="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-neutral-100"
                  [class.border-accent]="i === safeIndex()" [class.border-neutral-200]="i !== safeIndex()">
            <img [src]="m.type === 'image' ? m.src : m.poster" alt="" class="h-full w-full object-cover" />
            @if (m.type !== 'image') {
              <span class="absolute inset-0 flex items-center justify-center bg-black/35 text-xl text-white">▶</span>
            }
          </button>
        }
      </div>
    }
  `,
})
export class ProductGalleryComponent {
  private sanitizer = inject(DomSanitizer);

  product = input.required<Product>();
  index = signal(0);

  // Photos d'abord (image principale + galerie, sans doublon), vidéo en dernier
  media = computed<ProductMedia[]>(() => {
    const p = this.product();
    const photos = [...new Set([p.image, ...(p.images ?? [])].filter((s): s is string => !!s))];
    const list: ProductMedia[] = photos.map(src => ({ type: 'image', src }));

    if (p.videoEmbed) {
      const url = vidEmbed(p.videoEmbed);
      list.push({
        type: 'embed',
        src: url,
        safeSrc: this.sanitizer.bypassSecurityTrustResourceUrl(url),
        poster: p.image,
      });
    } else if (p.video) {
      list.push({ type: 'video', src: vid(p.video), poster: vidPoster(p.video) });
    }
    return list;
  });

  safeIndex = computed(() => Math.min(this.index(), Math.max(this.media().length - 1, 0)));
  current = computed(() => this.media()[this.safeIndex()]);

  go(i: number) { this.index.set(i); }
  next() { this.index.set((this.safeIndex() + 1) % this.media().length); }
  prev() { this.index.set((this.safeIndex() - 1 + this.media().length) % this.media().length); }
}