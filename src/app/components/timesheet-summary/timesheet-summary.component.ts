import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timesheet-summary',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass],
  templateUrl: './timesheet-summary.component.html',
  styleUrl: './timesheet-summary.component.scss'
})
export class TimesheetSummaryComponent {
  @Input() timesheet_summary: any = [];
}
