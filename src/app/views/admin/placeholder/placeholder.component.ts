import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/** Page temporaire pour les menus pas encore développés. */
@Component({
  selector: 'app-admin-placeholder',
  templateUrl: './placeholder.component.html',
})
export class AdminPlaceholderComponent {
  title = inject(ActivatedRoute).snapshot.data['title'] as string;
}