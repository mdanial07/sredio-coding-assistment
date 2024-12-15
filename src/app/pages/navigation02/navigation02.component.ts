import { Component, inject } from "@angular/core";
import { AgGridAngular } from "@ag-grid-community/angular";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ColDef, GetContextMenuItemsParams, MenuItemDef, ModuleRegistry, RowSelectionOptions } from "@ag-grid-community/core";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { GridApi } from "ag-grid-community";
import { ProjectListService } from "../../services/project-list";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AddProjectComponent } from "../../components/add-project/add-project.component";
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from "../../utils/format";
import * as XLSX from 'xlsx'
import { v4 as uuidv4 } from 'uuid';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideNativeDateAdapter } from '@angular/material/core';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
]);

@Component({
  selector: 'app-navigation02',
  standalone: true,
  imports: [AgGridAngular,
    MatSnackBarModule,
    AddProjectComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProjectListService, provideNativeDateAdapter()],
  templateUrl: './navigation02.component.html',
  styleUrl: './navigation02.component.scss',
})
export class Navigation02Component {
  title = 'John Doe'
  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  readonly range: any = new FormGroup({
    start: new FormControl<Date | null>(new Date("01-01-2024")),
    end: new FormControl<Date | null>(new Date("12-31-2024")),
  });


  columnDefs: ColDef[] = [
    { field: "project_name", headerName: 'Project Name', enableRowGroup: true, sortable: true },
    { field: "hours_in_project", headerName: 'Project Hours', enableRowGroup: true, sortable: true },
    { field: "time_records", headerName: 'Time records', enableRowGroup: true, sortable: true },
    { field: "is_included", headerName: 'Is Included', enableRowGroup: true, sortable: true },
    { field: "integration_from", headerName: 'Integration From', enableRowGroup: true, sortable: true },
    { field: "created_by", headerName: 'Created By', enableRowGroup: true, sortable: true },
    { field: "created_date", headerName: 'Created Date', enableRowGroup: true, sortable: true },
    { field: "description", headerName: 'Description', cellDataType: 'text', enableRowGroup: true, sortable: true },
  ];

  defaultColDef: ColDef = {
    filter: true,
    minWidth: 100,
  };
  rowData!: any[];
  autoGroupColumnDef: ColDef = { minWidth: 200, };
  paginationPageSize = 50;
  paginationPageSizeSelector: number[] | boolean = [50, 100]
  rowGroupPanelShow: "always" | "onlyWhenGrouping" | "never" = "always";
  themeClass: string = "ag-theme-quartz";
  gridApi!: GridApi<any>;
  rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "multiRow",
    groupSelects: "descendants",
    enableSelectionWithoutKeys: true,
    enableClickSelection: true,
  };
  archivedProject: any;

  constructor(private project: ProjectListService) { }

  ngOnInit() {
    this.getList(this.range.value.start, this.range.value.end);
  }

  getList(startDate: Date, endDate: Date) {
    this.project.getProjectListData().subscribe((projectData: any) => {
      const project_list = projectData.sort((a: any, b: any) => new Date(b?.created_date).valueOf() - new Date(a?.created_date).valueOf());
      if (this.range.valid) {
        const filteredByDateRange = project_list.filter((project: any) => {
          const createdDate = new Date(project.created_date);
          return createdDate >= new Date(startDate) && createdDate <= new Date(endDate);
        });

        const list = filteredByDateRange.map((data: any) => {
          return {
            ...data,
            created_date: formatDate(data.created_date)
          }
        })
        this.rowData = list;
      }
    })
  }

  getContextMenuItems(params: GetContextMenuItemsParams): (string | MenuItemDef)[] {
    const result: (string | MenuItemDef)[] = [
      {
        name: "Edit Project",
        disabled: this.gridApi.getSelectedRows().length > 1,
        tooltip: "Only Single row should be select for the edit project",
        action: () => {
          this.onEdit(params);
        },
      },
      {
        name: "Delete Project",
        action: () => {
          this.onDelete();
        },
      },
    ]
    return result;
  }

  openAddProjectDialog() {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      data: null,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getList(this.range.value.start, this.range.value.end);
      }
    });
  }

  onEdit(params: GetContextMenuItemsParams): void {
    const data = this.gridApi.getSelectedRows().length > 0 ? this.gridApi.getSelectedRows()[0] : params['node']?.data;
    if (data) {
      const dialogRef = this.dialog.open(AddProjectComponent, {
        data: data,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.getList(this.range.value.start, this.range.value.end);
        }
      });
    }
  }

  onDelete() {
    const getProjectList = localStorage.getItem('project-list')
    if (getProjectList) {
      const selectedRows = this.gridApi.getSelectedRows()
      const currentList = JSON.parse(getProjectList)
      selectedRows.map((selected: any) => {
        const indexToRemove = currentList.findIndex((item: any) => (item.id === selected.id));
        if (indexToRemove !== -1) {
          this.archivedProject = currentList[indexToRemove];
          currentList.splice(indexToRemove, 1);
          this.addDeletedItemInArchived();
        }
      })
      setTimeout(() => {
        localStorage.setItem('project-list', JSON.stringify(currentList as any))
        this.snackBar.open("Project successfully has been deleted", 'close', {
          duration: 2000
        });
        this.getList(this.range.value.start, this.range.value.end);
      }, 100);
    }
  }

  uploadCSVFile(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const fileReader: FileReader = new FileReader();
    const selectedFile = event.target.files[0];
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      let binarydata = event.target.result;
      let workbook = XLSX.read(binarydata, { type: 'binary' })
      workbook.SheetNames.forEach(sheet => {
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        const filteredData = jsonData.map((data: any) => {
          return {
            id: uuidv4(),
            project_name: data?.['Project Name'],
            hours_in_project: data?.['Project Hours'],
            time_records: data?.['Time records'],
            is_included: data?.['Is Included'],
            integration_from: data?.['Integration From'],
            created_by: data?.['Created By'],
            created_date: new Date(),
            description: data?.['Description'],
          }
        })
        this.updateCsvDataIntoList(filteredData)
      })
    }
  }

  updateCsvDataIntoList(csvData: any) {
    const getProjectList: any = localStorage.getItem('project-list')
    if (getProjectList) {
      const list = JSON.parse(getProjectList)
      csvData.map((data: any) => {
        list.push(data)
      })

      setTimeout(() => {
        this.snackBar.open("CSV has been successfully imported", 'close', {
          duration: 2000
        });
        localStorage.setItem('project-list', JSON.stringify(list as any))
        this.getList(this.range.value.start, this.range.value.end);
      }, 100);
    }
  }

  addDeletedItemInArchived() {
    const getArchivedProject = localStorage.getItem('archived-list')
    if (getArchivedProject) {
      const currentList = JSON.parse(getArchivedProject);
      currentList.push(this.archivedProject)
      localStorage.setItem('archived-list', JSON.stringify(currentList as any))
    } else {
      localStorage.setItem('archived-list', JSON.stringify([this.archivedProject] as any))
    }
  }

  onChangeDate(): void {
    console.log('this.range', this.range)
    if (this.range.valid) {
      if (this.range.value.start && this.range.value.end) {
        this.getList(this.range.value.start, this.range.value.end);
      }
    }
  }

  onFilterTextBoxChanged(): void {
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById('project-list') as HTMLInputElement).value,
    );
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }
}
