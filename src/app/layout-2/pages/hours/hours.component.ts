import { DecimalPipe, NgClass, NgFor } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { HoursService } from '../../services/hours.service';

@Component({
  selector: 'app-hours',
  standalone: true,
  imports: [
    MatExpansionModule,
    NgFor,
    DecimalPipe,
    NgClass,
  ],
  providers: [HoursService],
  templateUrl: './hours.component.html',
  styleUrl: './hours.component.scss'
})
export class HoursComponent {
  readonly panelOpenState = signal(true);
  @Input() dates!: any;

  currentYearHours: any = 0;
  fullYearHours: any = 0;

  unclaimed = 0;
  rendering_system = 0;
  api_performance = 0;

  quarterSummaries: { hours: number; date: string; quarter: string, tab: any }[] = [];
  typewiseSummary: any;

  constructor(
    private hours: HoursService,
  ) { }

  ngOnInit(): void {
    const startDate = this.dates.start;
    const endDate = this.dates.end;

    this.currentYearHours = this.hours.getCurrentYearHours(startDate, endDate).toFixed(0);
    this.fullYearHours = this.hours.getProjectedHours(startDate, endDate).toFixed(0);

    this.calculateQuarterlyHoursInRange(startDate, endDate);
    this.calculateTypewiseSummary(startDate, endDate);
  }

  calculateQuarterlyHoursInRange(startDate: any, endDate: any) {
    const year = new Date(this.dates.start).getFullYear()

    this.quarterSummaries = this.hours.calculateQuarterlyHoursInRange(startDate, endDate);
    this.quarterSummaries.map((res: any, index: number) => {

      res['tab'] = false;
      if (index === 0) {

        res['date'] = `Jan 1 - Mar 31, ${year}`
      }
      if (index === 1) {
        res['date'] = `Apr 1 - Jun 30, ${year}`
      }
      if (index === 2) {
        res['date'] = `Jul 1 - Sep 30, ${year}`
      }
      if (index === 3) {
        res['date'] = `Oct 1 - Dec 31, ${year}`
      }
    })
    const currentYearCount: any = this.hours.getCurrentYearHours(startDate, endDate).toFixed(0);

    this.quarterSummaries.push({
      hours: currentYearCount,
      date: `Jan 1 - Dec 31, ${year}`,
      quarter: "Year to Date",
      tab: true
    })
  }

  selectQuarter(value: any) {
    this.quarterSummaries.map(res => res.tab = false);
    const index = this.quarterSummaries.findIndex(e => e.quarter === value.quarter);
    this.quarterSummaries[index].tab = true;
    const year = new Date(this.dates.start).getFullYear();

    if (index === -1 || index === 4) {
      this.ngOnInit();
      return;
    }

    const quarterDates = [
      { start: new Date(year, 0, 1), end: new Date(year, 2, 31) },
      { start: new Date(year, 3, 1), end: new Date(year, 5, 30) },
      { start: new Date(year, 6, 1), end: new Date(year, 8, 30) },
      { start: new Date(year, 9, 1), end: new Date(year, 11, 31) },
    ];

    const { start, end } = quarterDates[index];

    const data = this.hours.calculateQuarterlyHoursInRange(start, end)[index];
    this.calculateTypewiseSummary(start, end);

    this.currentYearHours = data.hours;
    this.fullYearHours = this.hours.getCurrentYearHours(start, end).toFixed(0);
  }

  calculateTypewiseSummary(startDate: any, endDate: any) {
    const typewiseSummary = this.hours.getHoursByTypeInDateRange(startDate, endDate);
    this.unclaimed = typewiseSummary.find((summary: any) => summary.type === "Unclaimed Work").hours
    this.rendering_system = typewiseSummary.find((summary: any) => summary.type === "Rendering System").hours
    this.api_performance = typewiseSummary.find((summary: any) => summary.type === "API Performance").hours
  }
}
