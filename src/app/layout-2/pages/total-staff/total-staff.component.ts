import { Component } from '@angular/core';
import { AgCharts } from "ag-charts-angular";
import { AgChartOptions } from "ag-charts-community";
import { StaffService } from '../../../services/staff.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-total-staff',
  standalone: true,
  imports: [
    NgIf,
    AgCharts,
    NgFor
  ],
  templateUrl: './total-staff.component.html',
  styleUrl: './total-staff.component.scss'
})
export class TotalStaffComponent {
  public barChartOptions: AgChartOptions | any;
  public mobileStaffBarChart: AgChartOptions | any;

  staffMembers: any = [];
  mobileStaffMembers: any = [];

  constructor(private charts: StaffService) { }

  ngOnInit(): void {
    this.getStaffHours();
    this.getMobileStaffHours();
  }

  getStaffHours(): void {
    this.charts.getStaffHours().subscribe(members => {
      this.barChartOptions = {
        data: members,
        background: {
          fill: '#FBFBFB',
        },
        series: [
          {
            type: "bar",
            xKey: "name",
            yKey: "total_hours",
            yName: "SR&ED",
            fill: '#2437a5',
            cornerRadius: 4
          },
          {
            type: "bar",
            xKey: "name",
            yKey: "unclaimed_hours",
            yName: "Unclaimed",
            fill: '#cccccc',
            cornerRadius: 4
          }
        ],
      };
      console.log('this.barChartOptions', this.barChartOptions)

      this.staffMembers = members;
    })
  }

  getMobileStaffHours(): void {
    this.charts.getMobileStaffHours().subscribe(members => {
      this.mobileStaffBarChart = {
        data: members,
        background: {
          fill: '#FBFBFB',
        },
        series: [
          {
            type: "bar",
            xKey: "name",
            yKey: "total_hours",
            yName: "SR&ED",
            fill: '#2437a5',
            cornerRadius: 4
          },
          {
            type: "bar",
            xKey: "name",
            yKey: "unclaimed_hours",
            yName: "Unclaimed",
            fill: '#cccccc',
            cornerRadius: 4
          }
        ],
      };
      this.mobileStaffMembers = members;
    })
  }

  selectStaffMember(value: any): void {
    console.log('value', value)
  }

  selectMobileStaffMember(value: any): void {
    console.log('value', value)
  }
}
