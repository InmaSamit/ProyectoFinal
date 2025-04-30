import { Component } from '@angular/core';
import { InterestsComponent } from '../interest/interest.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [InterestsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
