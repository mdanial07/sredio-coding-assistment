import { Component } from '@angular/core';
import { AgCharts } from "ag-charts-angular";
import { AgChartOptions } from "ag-charts-community";
import { ChartsService } from '../../services/overall_hours';

@Component({
  selector: 'app-project-hours',
  standalone: true,
  imports: [AgCharts],
  providers: [ChartsService],
  templateUrl: './project-hours.component.html',
  styleUrl: './project-hours.component.scss'
})
export class ProjectHoursComponent {
  public barChartOptions: AgChartOptions | any;

  constructor(private charts: ChartsService) { }

  ngOnInit(): void {
    this.getProjectHours();
  }

  getProjectHours(): void {
    this.charts.getProjectHours().subscribe(project_hours => {
      this.barChartOptions = {
        data: project_hours,
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
        ],
      };
    })
  }
}
