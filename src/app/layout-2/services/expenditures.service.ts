import { Injectable } from '@angular/core';
import * as expendituresData from '../../../../public/assets/expenditures_2020_2024.json';

@Injectable({
  providedIn: 'root',
})
export class ExpendituresService {

  calculateQuarterlyRatesInRange(startDate: Date | string, endDate: Date | string): any[] {
    const data: any[] = (expendituresData as any).default;

    const quarterMapping: any = {
      Q1: { start: '-01-01', end: '-03-31' },
      Q2: { start: '-04-01', end: '-06-30' },
      Q3: { start: '-07-01', end: '-09-30' },
      Q4: { start: '-10-01', end: '-12-31' },
    };

    const result: any[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    for (let year = startYear; year <= endYear; year++) {
      Object.keys(quarterMapping).forEach((quarter) => {
        const { start: quarterStart, end: quarterEnd } = quarterMapping[quarter];
        const quarterStartDate = new Date(`${year}${quarterStart}`);
        const quarterEndDate = new Date(`${year}${quarterEnd}`);

        if (quarterEndDate < start || quarterStartDate > end) {
          result.push({
            rate: 0,
            date: `${quarterStartDate.toISOString().slice(0, 10)} - ${quarterEndDate
              .toISOString()
              .slice(0, 10)}`,
            quarter,
          });
        } else {
          const actualStart = quarterStartDate < start ? start : quarterStartDate;
          const actualEnd = quarterEndDate > end ? end : quarterEndDate;

          const quarterRates = data
            .filter(
              (entry) =>
                new Date(entry.date) >= actualStart && new Date(entry.date) <= actualEnd
            )
            .reduce((sum, entry) => sum + entry.rate, 0);

          result.push({
            rate: quarterRates,
            date: `${actualStart.toISOString().slice(0, 10)} - ${actualEnd
              .toISOString()
              .slice(0, 10)}`,
            quarter,
          });
        }
      });
    }

    return result;
  }

  getRatesByTypeInDateRange(startDate: string, endDate: string) {
    const dataList: any[] = (expendituresData as any).default;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredData = dataList.filter(item => {
      const date = new Date(item.date);
      return date >= start && date <= end;
    });

    const result = filteredData.reduce((acc: any[], curr: any) => {
      const existingType = acc.find(item => item.type === curr.type);
      if (existingType) {
        existingType.rate += curr.rate;
      } else {
        acc.push({ type: curr.type, rate: curr.rate });
      }
      return acc;
    }, []);

    return result;
  }

  getCurrentYearRate(startDate: Date, endDate: Date): number {
    const dataList: any[] = (expendituresData as any).default;

    const filteredData = dataList.filter(item => {
      const date = new Date(item.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });

    return filteredData.reduce((acc, curr) => acc + curr.rate, 0);
  }

  getProjectedRate(startDate: Date, endDate: Date): number {
    const dataList: any[] = (expendituresData as any).default;

    const filteredData = dataList.filter(item => {
      const date = new Date(item.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });

    const totalRate = filteredData.reduce((acc, curr) => acc + curr.rate, 0);
    const totalDaysInRange = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24);

    const currentDate = new Date();
    const elapsedDays = Math.min(
      (currentDate.getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24),
      totalDaysInRange
    );

    const projectedRate = (totalRate / elapsedDays) * totalDaysInRange;

    return projectedRate;
  }
}