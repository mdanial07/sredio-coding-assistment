import { Component, inject } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from "@ag-grid-community/angular";
import { EmpTableComponent } from '../../components/emp-table/emp-table.component';
import { ColDef, GetContextMenuItemsParams, MenuItemDef, ModuleRegistry, RowSelectionOptions } from "@ag-grid-community/core";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { formatDate } from '../../utils/format';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule,]);

@Component({
  selector: 'app-archived-project',
  standalone: true,
  imports: [AgGridAngular, MatSnackBarModule, EmpTableComponent],
  templateUrl: './archived-project.component.html',
  styleUrl: './archived-project.component.scss'
})
export class ArchivedProjectComponent {
  private snackBar = inject(MatSnackBar);

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

  themeClass: string = "ag-theme-quartz";
  rowData: any;
  private gridApi!: GridApi<any>;
  paginationPageSize = 50;
  paginationPageSizeSelector: number[] | boolean = [50, 100]
  defaultColDef: ColDef = {
    filter: true,
    minWidth: 100,
  };
  rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "multiRow",
    enableSelectionWithoutKeys: true,
    enableClickSelection: true,
  };
  restoredProject: any;

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    const projectData = JSON.parse(localStorage.getItem('archived-list') as any)
    if (projectData.length) {
      const project_list = projectData.sort((a: any, b: any) => new Date(b?.created_date).valueOf() - new Date(a?.created_date).valueOf());
      const list = project_list.map((data: any) => {
        return {
          ...data,
          created_date: formatDate(data.created_date)
        }
      })
      this.rowData = list
    }
  }

  getContextMenuItems(params: GetContextMenuItemsParams): (string | MenuItemDef)[] {
    const result: (string | MenuItemDef)[] = [
      {
        name: "Retore",
        action: () => {
          this.restoreProject(params);
        },
      },
    ]
    return result;
  }

  restoreProject(params: GetContextMenuItemsParams) {
    const selectedRows = this.gridApi.getSelectedRows().length > 0 ? this.gridApi.getSelectedRows() : [params['node']?.data];
    if (selectedRows.length > 0) {
      const getArchivedProject = localStorage.getItem('archived-list')
      if (getArchivedProject) {
        const currentlist = JSON.parse(getArchivedProject)

        selectedRows.map((selected: any) => {
          const indexToRemove = currentlist.findIndex((item: any) => (item.id === selected.id));
          if (indexToRemove !== -1) {
            this.restoredProject = currentlist[indexToRemove];
            currentlist.splice(indexToRemove, 1);
            this.restoredProjectFromArchived();
          }
        })
        setTimeout(() => {
          this.snackBar.open("Project has been successfullu restored", 'close', {
            duration: 2000
          });
          localStorage.setItem('archived-list', JSON.stringify(currentlist as any))
          this.getList();
        }, 100);
      }
    }
  }

  restoredProjectFromArchived(): void {
    const getProjectList = localStorage.getItem('project-list')
    if (getProjectList) {
      const currentlist = JSON.parse(getProjectList);
      currentlist.push(this.restoredProject)
      localStorage.setItem('project-list', JSON.stringify(currentlist as any))
    } else {
      localStorage.setItem('project-list', JSON.stringify([this.restoredProject] as any))
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onFilterTextBoxChanged(): void {
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById('archived') as HTMLInputElement).value,
    );
  }
}
