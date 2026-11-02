import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css'
})
export class ClientLayoutComponent {

}
