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
  public barChartOptions!: AgChartOptions;

  constructor(private charts: ChartsService) { }

  ngOnInit(): void {
    this.getProjectHours();
  }

  getProjectHours(): void {
    const colorMapper: any = {
      "Apple": '#00A4FF',
      "Walmart": '#FA6800',
      "Microsoft": '#AF332D',
      "Project 01": '#3F1EB5',
      "Project 02": '#7555CB',
      "Project 03": '#9A1CCC',
      "Project 04": '#50D9A2',
      "Project 05": '#BF5782',
      "Project 06": '#3C3C3C',
      "Project 07": '#63D11F',
    }
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
            cornerRadius: 4,
            itemStyler: (dataItem: any) => {
              return { fill: colorMapper[dataItem.datum.month] };
            }
          },
        ],
      };
    })
  }
}
