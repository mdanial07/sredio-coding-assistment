import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AgCharts } from "ag-charts-angular";
import { AgChartOptions } from "ag-charts-community";
import { ChartsService } from '../../services/overall_hours';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-overall-hours',
  standalone: true,
  imports: [AgCharts, NgIf],
  providers: [ChartsService],
  templateUrl: './overall-hours.component.html',
  styleUrl: './overall-hours.component.scss'
})
export class OverallHoursComponent implements OnInit {
  public barChartOptions: AgChartOptions | any;
  public donutChartOptions: AgChartOptions | any;
  isBrowser: boolean = false;

  constructor(
    private charts: ChartsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.getTotalWorkedHours();
    this.getCumulativeHours();
  }

  getTotalWorkedHours(): void {
    this.charts.getTotalWorkedHours().subscribe(total_hours => {
      this.donutChartOptions = {
        data: total_hours,
        background: {
          fill: '#FBFBFB',
        },
        series: [
          {
            type: "donut",
            angleKey: "amount",
            innerRadiusRatio: 0.6,
            innerLabels: [
              {
                text: "Total Hours",
              },
              {
                text: "1,000",
                fontSize: 20,
              },
            ],
            fills: ['#03BCF3', '#091836'],
          },
        ]
      };
    })
  }

  getCumulativeHours(): void {
    this.charts.getCumulativeHours().subscribe(cumulative_hours => {
      this.barChartOptions = {
        data: cumulative_hours,
        background: {
          fill: '#FBFBFB',
        },
        series: [
          {
            type: "bar",
            xKey: "month",
            yKey: "total_hours",
            yName: "Total Hours",
            fill: '#091836',
            cornerRadius: 4
          },
          {
            type: "bar",
            xKey: "month",
            yKey: "cumulative_hours",
            yName: "Cumulative Hours",
            fill: '#03BCF3',
            cornerRadius: 4
          }
        ],
      };
    })
  }
}
