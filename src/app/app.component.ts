// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// //import { LoginComponent } from "./login/login.component";
// //import { RegisterComponent } from './register/register.component';
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'Login Register App';
// }
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],   // ✅ only router outlet
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
