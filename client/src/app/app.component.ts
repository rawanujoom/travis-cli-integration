import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  	<div class="content">
		<app-header></app-header>
		<router-outlet></router-outlet>
	</div>
	`,
  styles: [] 
})
export class AppComponent {
  title = 'client';
}
