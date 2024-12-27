import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffService {

  getStaffHours() {
    return of([
      {
        "name": "John Doe",
        "unclaimed_hours": 50,
        "total_hours": 500,
        "details": {
          "startDate": "Jan 1, 2024",
          "endDate": "Dec 31, 2024",
          "rangeDate": "Jan 1 - Dec 31, 2024",
          "province": "ON",
          "hireDate": "Jan 1, 2022",
          "unclaimed": 165,
          "rendering_system": 133,
          "sredHours": 133,
          "total": 2033,
          "allocation": 1.66,
          "department": "Software Development",
          "position": "Senior Developer",
          "manager": "Emma Green",
          "project": "Cloud Migration",
          "email": "johndoe@email.com",
          "phone": "+1-555-123-4567",
          "location": "Toronto, ON"
        }
      },
      {
        "name": "Danial",
        "unclaimed_hours": 200,
        "total_hours": 500,
        "details": {
          "startDate": "Feb 15, 2023",
          "endDate": "Feb 14, 2024",
          "rangeDate": "Feb 15, 2023 - Feb 14, 2024",
          "province": "BC",
          "hireDate": "Feb 15, 2023",
          "unclaimed": 180,
          "rendering_system": 120,
          "sredHours": 100,
          "total": 1750,
          "allocation": 1.20,
          "department": "Research & Development",
          "position": "Data Scientist",
          "manager": "Sarah Williams",
          "project": "AI Research",
          "email": "danial@email.com",
          "phone": "+1-555-987-6543",
          "location": "Vancouver, BC"
        }
      },
      {
        "name": "Philip",
        "unclaimed_hours": 90,
        "total_hours": 1000,
        "details": {
          "startDate": "Mar 1, 2023",
          "endDate": "Feb 28, 2024",
          "rangeDate": "Mar 1, 2023 - Feb 28, 2024",
          "province": "AB",
          "hireDate": "Mar 1, 2023",
          "unclaimed": 50,
          "rendering_system": 250,
          "sredHours": 200,
          "total": 3000,
          "allocation": 1.50,
          "department": "IT Infrastructure",
          "position": "System Administrator",
          "manager": "Michael Brown",
          "project": "Server Optimization",
          "email": "philip@email.com",
          "phone": "+1-555-321-8765",
          "location": "Calgary, AB"
        }
      },
      {
        "name": "Xavier",
        "unclaimed_hours": 250,
        "total_hours": 700,
        "details": {
          "startDate": "Apr 1, 2024",
          "endDate": "Mar 31, 2025",
          "rangeDate": "Apr 1, 2024 - Mar 31, 2025",
          "province": "QC",
          "hireDate": "Apr 1, 2024",
          "unclaimed": 220,
          "rendering_system": 180,
          "sredHours": 150,
          "total": 1750,
          "allocation": 2.00,
          "department": "Digital Marketing",
          "position": "SEO Specialist",
          "manager": "Laura Adams",
          "project": "Website Overhaul",
          "email": "xavier@email.com",
          "phone": "+1-555-654-3210",
          "location": "Montreal, QC"
        }
      },
      {
        "name": "Anne",
        "unclaimed_hours": 120,
        "total_hours": 500,
        "details": {
          "startDate": "Jun 1, 2023",
          "endDate": "May 31, 2024",
          "rangeDate": "Jun 1, 2023 - May 31, 2024",
          "province": "ON",
          "hireDate": "Jun 1, 2023",
          "unclaimed": 100,
          "rendering_system": 75,
          "sredHours": 50,
          "total": 1500,
          "allocation": 1.30,
          "department": "Marketing",
          "position": "Content Strategist",
          "manager": "Daniela Scott",
          "project": "Brand Awareness Campaign",
          "email": "anne@email.com",
          "phone": "+1-555-222-3333",
          "location": "Ottawa, ON"
        }
      },
      {
        "name": "Sophia",
        "unclaimed_hours": 20,
        "total_hours": 90,
        "details": {
          "startDate": "Jul 1, 2023",
          "endDate": "Jun 30, 2024",
          "rangeDate": "Jul 1, 2023 - Jun 30, 2024",
          "province": "NS",
          "hireDate": "Jul 1, 2023",
          "unclaimed": 10,
          "rendering_system": 30,
          "sredHours": 25,
          "total": 750,
          "allocation": 0.80,
          "department": "Customer Service",
          "position": "Support Specialist",
          "manager": "Jonas Lee",
          "project": "Customer Satisfaction Survey",
          "email": "sophia@email.com",
          "phone": "+1-555-444-5555",
          "location": "Halifax, NS"
        }
      }
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
