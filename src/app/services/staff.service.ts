import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffService {

  getStaffHours() {
    return of([
      {
        name: "John Doe",
        unclaimed_hours: 50,
        total_hours: 500,
      },
      {
        name: "Danial",
        unclaimed_hours: 200,
        total_hours: 500,
      },
      {
        name: "Philip",
        unclaimed_hours: 90,
        total_hours: 1000,
      },
      {
        name: "Xavier",
        unclaimed_hours: 250,
        total_hours: 700,
      },
      {
        name: "Anne",
        unclaimed_hours: 120,
        total_hours: 500,
      },
      {
        name: "Sophia",
        unclaimed_hours: 20,
        total_hours: 90,
      },
    ])
  }

  getMobileStaffHours() {
    return of([
      {
        name: "Xavier",
        unclaimed_hours: 250,
        total_hours: 700,
      },
      {
        name: "Anne",
        unclaimed_hours: 120,
        total_hours: 500,
      },
      {
        name: "Sophia",
        unclaimed_hours: 20,
        total_hours: 90,
      }
    ])
  }

  getStaffSalary() {
    return of([
      {
        name: "M Danial",
        start_date: '2021-01-01',
        end_date: 21,
        expected_salary: 60000,
        hourly_rate: 11,
        hours_worked: 2000,
        confirm_salary: 90000,
      },
      {
        name: "Darrell Steward",
        start_date: '2021-01-01',
        end_date: 12,
        expected_salary: 70000,
        hourly_rate: 12,
        hours_worked: 2000,
        confirm_salary: 90000,
      },
      {
        name: "Marvin McKinney",
        start_date: '2021-01-01',
        end_date: 34,
        expected_salary: 80000,
        hourly_rate: 21,
        hours_worked: 2000,
        confirm_salary: 90000,
      },
      {
        name: "Brooklyn Simmons",
        start_date: '2021-01-01',
        end_date: 44,
        expected_salary: 55000,
        hourly_rate: 31,
        hours_worked: 2000,
        confirm_salary: 90000,
      },
      {
        name: "Wade Warren",
        start_date: '2021-01-01',
        end_date: 21,
        expected_salary: 66000,
        hourly_rate: 41,
        hours_worked: 2000,
        confirm_salary: 90000,
      },
      {
        name: "Theresa Webb",
        start_date: '2021-01-01',
        end_date: 56,
        expected_salary: 77000,
        hourly_rate: 51,
        hours_worked: 2000,
        confirm_salary: 90000,
      },
    ])
  }

  getVendorInvoices() {
    return of([
      {
        "invoice_date": "2021-01-01",
        "invoice_number": "60000",
        "vendor_name": "M Danial",
        "invoice_amount": 21,
        "project": "Node JS",
        "provider_name": "Blue Ocean Tech",
        "description": "Website hosting fee for January",
        "is_sred": "Yes",
        "province": "ON",
        "status": "In Progress"
      },
      {
        "invoice_date": "2021-02-15",
        "invoice_number": "60001",
        "vendor_name": "J Smith",
        "invoice_amount": 45,
        "project": "Server Handling",
        "provider_name": "Northwest Analytics",
        "description": "Consulting services rendered in February",
        "is_sred": "No",
        "province": "BC",
        "status": "Approved"
      },
      {
        "invoice_date": "2021-03-10",
        "invoice_number": "60002",
        "vendor_name": "ACME Supplies",
        "invoice_amount": 120,
        "project": "Blockchain",
        "provider_name": "Alpha Supply Co.",
        "description": "Office supplies purchase",
        "is_sred": "No",
        "province": "AB",
        "status": "Pending"
      },
      {
        "invoice_date": "2021-04-22",
        "invoice_number": "60003",
        "vendor_name": "Tech Solutions",
        "invoice_amount": 2000,
        "project": "Artificial Intelligence",
        "provider_name": "Nova Systems Ltd.",
        "description": "Annual software subscription",
        "is_sred": "Yes",
        "province": "ON",
        "status": "In Progress"
      },

    ])
  }
}
