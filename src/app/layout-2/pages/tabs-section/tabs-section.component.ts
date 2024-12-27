import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tabs-section',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
  ],
  templateUrl: './tabs-section.component.html',
  styleUrl: './tabs-section.component.scss'
})
export class TabsSectionComponent {
  @Output() selectedTab = new EventEmitter();

  tab = 'hours';

  select(item: string): void {
    this.tab = item;
    this.selectedTab.emit(item)
  }
}
