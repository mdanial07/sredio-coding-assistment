import { Component, inject } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from "@ag-grid-community/angular";
import { ColDef, GetContextMenuItemsParams, MenuItemDef, ModuleRegistry, RowSelectionOptions } from "@ag-grid-community/core";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { formatDate } from '../../utils/format';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RepositoryService } from '../../services/repos';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { ContributorRenderer } from './cellRenders/contributors-renderer';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IssuesComponent } from '../../components/issues/issues.component';
import { PullRequestsComponent } from '../../components/pull-requests/pull-requests.component';
import { CommitsComponent } from '../../components/commits/commits.component';

ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule,]);

@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [
    AgGridAngular,
    MatSnackBarModule,
    NgIf,
    ReactiveFormsModule,
    NgFor,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    IssuesComponent,
    PullRequestsComponent,
    CommitsComponent,
  ],
  providers: [RepositoryService],
  templateUrl: './repos.component.html',
  styleUrl: './repos.component.scss'
})
export class ReposComponent {

  columnDefs: ColDef[] = [
    { field: "id", headerName: 'Repository ID', enableRowGroup: true, sortable: true },
    { field: "name", headerName: 'Repository Name', enableRowGroup: true, sortable: true },
    { field: "full_name", headerName: 'Full Name', enableRowGroup: true, sortable: true },
    { field: "pulls_count", headerName: 'Pull Requests', enableRowGroup: true, sortable: true },
    { field: "commits_count", headerName: 'Commits', enableRowGroup: true, sortable: true },
    { field: "issues_count", headerName: 'Issues', enableRowGroup: true, sortable: true },
    { field: "size", headerName: 'Size', enableRowGroup: true, sortable: true },
    { field: "visibility", headerName: 'Visibility', enableRowGroup: true, sortable: true },
    { field: "html_url", headerName: 'Repository URL', cellRenderer: ContributorRenderer },
    { field: "contributors_url", headerName: 'Contributors', cellRenderer: ContributorRenderer },
    { field: "updated_at", headerName: 'Updated At', enableRowGroup: true, sortable: true },
    { field: "created_at", headerName: 'Created At', enableRowGroup: true, sortable: true },
  ];

  repoForm = new FormControl('', [Validators.required]);

  themeClass: string = "ag-theme-quartz";
  rowData: any = [];
  private gridApi!: GridApi<any>;
  paginationPageSize = 50;
  paginationPageSizeSelector: number[] | boolean = [50, 100]
  defaultColDef: ColDef = {
    filter: true,
    minWidth: 100,
  };
  rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "singleRow",
    enableSelectionWithoutKeys: true,
    enableClickSelection: true,
  };
  restoredProject: any;
  showIssues: boolean = false;
  showCommits: boolean = false;
  showPullRequests: boolean = false;
  selectedId: any;

  constructor(
    private repo: RepositoryService,
  ) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.repo.getList('', false).subscribe((repositories: any) => {
      if (repositories?.data) {
        const list = repositories?.data;
        const _id = list[0]?._id
        this.repoForm.patchValue(_id)
        this.getRepositoryData(_id)
      }
    })
  }

  getRepositoryData(id: string): void {
    this.repo.getRepository(`id=${id}`, true).subscribe((repositories: any) => {
      if (repositories?.data) {
        const list = repositories?.data.map((data: any) => {
          return {
            ...data,
            updated_at: formatDate(data.updated_at),
            created_at: formatDate(data.created_at)
          }
        })
        this.rowData = list
      }
    })
  }

  getContextMenuItems(params: GetContextMenuItemsParams): (string | MenuItemDef)[] {
    this.showIssues = false;
    this.showCommits = false;
    this.showPullRequests = false;
    const result: (string | MenuItemDef)[] = [
      {
        name: "Fetch Pull Requests",
        action: () => {
          this.githubPullRequests(params);
        },
      },
      {
        name: "Fetch Issues",
        action: () => {
          this.githubIssues(params);
        },
      },
      {
        name: "Fetch Commits",
        action: () => {
          this.githubCommits(params);
        },
      },
    ]
    return result;
  }

  githubPullRequests(params: GetContextMenuItemsParams) {
    const data = params?.node?.data
    this.selectedId = data['_id']
    setTimeout(() => {
      this.showPullRequests = true;
    }, 0);
  }

  githubIssues(params: GetContextMenuItemsParams) {
    const data = params?.node?.data
    this.selectedId = data['_id']
    setTimeout(() => {
      this.showIssues = true;
    }, 0);
  }

  githubCommits(params: GetContextMenuItemsParams) {
    const data = params?.node?.data
    this.selectedId = data['_id']
    setTimeout(() => {
      this.showCommits = true;
    }, 0);
  }

  selectedRepo(): void {
    console.log(this.repoForm.value)
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onFilterTextBoxChanged(): void {
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById('repositories') as HTMLInputElement).value,
    );
  }
}
