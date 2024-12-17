import { Component, Input } from '@angular/core';
import { AgGridAngular } from "@ag-grid-community/angular";
import { ColDef, IServerSideDatasource, RowModelType, ModuleRegistry, GridApi, GridReadyEvent } from "@ag-grid-community/core";
import { formatDate } from '../../utils/format';
import { RepositoryService } from '../../services/repos';
import { HttpClientModule } from '@angular/common/http';
import { PRRenderer } from '../../pages/repos/cellRenders/contributors-renderer';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

ModuleRegistry.registerModules([ServerSideRowModelModule]);

@Component({
  selector: 'app-pull-requests',
  standalone: true,
  imports: [
    AgGridAngular,
    HttpClientModule,
  ],
  providers: [RepositoryService],
  templateUrl: './pull-requests.component.html',
  styleUrl: './pull-requests.component.scss'
})
export class PullRequestsComponent {
  @Input() id!: string;

  columnDefs: ColDef[] = [
    { field: "id", headerName: 'Issue ID', enableRowGroup: true, sortable: true },
    { field: "author_association", headerName: 'Author', enableRowGroup: true, sortable: true },
    { field: "user.login", headerName: 'User', enableRowGroup: false, sortable: false, filter: false },
    { field: "user.type", headerName: 'User Type', enableRowGroup: false, sortable: false, filter: false },
    { field: "assignee", headerName: 'Assignee', enableRowGroup: false, sortable: false, filter: false },
    { field: "state", headerName: 'PR Status', enableRowGroup: true, sortable: true },
    { field: "html_url", headerName: 'PR Link', cellRenderer: PRRenderer },
    { field: "number", headerName: 'PR Number ', enableRowGroup: true, sortable: true },
    { field: "merged_at", headerName: 'Merge Date', enableRowGroup: true, sortable: true },
    { field: "created_at", headerName: 'Created At', enableRowGroup: true, sortable: true },
  ];

  themeClass: string = "ag-theme-quartz";
  private gridApi!: GridApi;
  paginationPageSize = 50;
  public cacheBlockSize = 50;
  paginationPageSizeSelector: number[] | boolean = [50, 100, 200];
  defaultColDef: ColDef = {
    filter: true,
    minWidth: 100,
  };
  rowSelection: "single" | "multiple" = "single";
  public rowModelType: RowModelType = "serverSide";
  private searchQuery: string = '';

  constructor(
    private repo: RepositoryService,
  ) { }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.loadGridData();
  }

  onFilterTextBoxChanged(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.searchQuery = input;
    this.loadGridData();
  }

  loadGridData() {
    const datasource = this.createServerSideDatasource();
    this.gridApi.setGridOption("serverSideDatasource", datasource);
  }

  createServerSideDatasource(): IServerSideDatasource {
    return {
      getRows: (params: any) => {
        const { startRow, endRow } = params.request;
        const page = Math.floor(startRow / this.paginationPageSize);
        const limit = this.paginationPageSize;

        const queryParams = `page=${page + 1}&limit=${limit}&id=${this.id}&search=${this.searchQuery}`;

        this.repo.getPullRequestList(queryParams, true).subscribe(
          (repositories: any) => {
            if (repositories?.data) {
              const list = repositories.data['data'].map((data: any) => ({
                ...data,
                merged_at: data.merged_at ? formatDate(data.merged_at) : '-',
                created_at: data.created_at ? formatDate(data.created_at) : '',
                assignee: data.assignee ? data.assignee.login : '-',
              }));

              params.success({
                rowData: list,
                rowCount: repositories.data['total_count'],
              });
            } else {
              params.fail();
            }
          },
          () => {
            params.fail();
          }
        );
      },
    };
  }

  onPaginationChanged(event: any): void {
    console.log('Current Page:', this.gridApi.paginationGetCurrentPage());
  }
}
