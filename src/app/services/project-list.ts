import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { project_list_data } from '../utils/project-list';

@Injectable()
export class ProjectListService {

  getProjectListData() {
    const getProjectList = window.localStorage.getItem('project-list')

    if (getProjectList === null) {
      window.localStorage.setItem('project-list', JSON.stringify(project_list_data as any))
    }

    const list = getProjectList === null ? project_list_data : JSON.parse(getProjectList)

    return of(list)
  }
}
