import { Component } from '@angular/core';
import { general_navigation, tools_navigation } from '../../utils/navigation-list';
import { NgForOf, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterModule,
    MatMenuModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  general_navigation = general_navigation;
  tools_navigation = tools_navigation;

}
