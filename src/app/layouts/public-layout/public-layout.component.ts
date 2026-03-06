import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-public-layout',
  template: `
    <div class="public-container">
      <router-outlet />
    </div>
  `,
  imports: [RouterOutlet]
})
export class PublicLayoutComponent {}