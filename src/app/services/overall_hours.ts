import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class ChartsService {

  getTotalWorkedHours() {
    const total_hours = [
      { asset: "Total Worked Hours", amount: 600 },
      { asset: "Total Tracked Hours", amount: 400 },
    ]
    return of(total_hours)
  }

  getCumulativeHours() {
    const cumulative_hours = [
      {
        month: "Jan",
        total_hours: 50,
        cumulative_hours: 500,
      },
      {
        month: "Feb",
        total_hours: 200,
        cumulative_hours: 500,
      },
      {
        month: "Mar",
        total_hours: 90,
        cumulative_hours: 1000,
      },
      {
        month: "Apr",
        total_hours: 250,
        cumulative_hours: 700,
      },
      {
        month: "May",
        total_hours: 120,
        cumulative_hours: 500,
      },
      {
        month: "Jun",
        total_hours: 20,
        cumulative_hours: 90,
      },
      {
        month: "Jul",
        total_hours: 60,
        cumulative_hours: 90,
      },
      {
        month: "Aug",
        total_hours: 60,
        cumulative_hours: 500,
      },
      {
        month: "Sep",
        total_hours: 250,
        cumulative_hours: 90,
      }
    ]
    return of(cumulative_hours)
  }

  getProjectHours() {
    const project_hours = [
      {
        month: "Apple",
        total_hours: 250,
        color: '#aaff99',
      },
      {
        month: "Walmart",
        total_hours: 600,
      },
      {
        month: "Microsoft",
        total_hours: 40,
      },
      {
        month: "Project 01",
        total_hours: 150,
      },
      {
        month: "Project 02",
        total_hours: 400,
      },
      {
        month: "Project 03",
        total_hours: 600,
      },
      {
        month: "Project 04",
        total_hours: 180,
      },
      {
        month: "Project 05",
        total_hours: 480,
      },
      {
        month: "Project 06",
        total_hours: 150,
      },
      {
        month: "Project 07",
        total_hours: 40,
      }
    ]
    return of(project_hours)
  }
}
