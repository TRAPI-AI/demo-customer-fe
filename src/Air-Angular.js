import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <div>
      <h1>{{ title }}</h1>
      <p>Welcome to the example component!</p>
    </div>
  `,
  styleUrls: ['./app.component.css'] // Assuming App.css is in the same directory
})
export class ExampleComponent {
  title = 'Example Component';

  constructor() {
    // Initialization logic here
  }

  ngOnInit() {
    // Component initialization logic here
  }
}