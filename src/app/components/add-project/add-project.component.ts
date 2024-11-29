import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatLabel,
    MatInputModule,
    MatFormFieldModule,
    MatDialogContent,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent {
  data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<any>);
  private snackBar = inject(MatSnackBar);

  isEditMode = false;

  addProjectForm = new FormGroup({
    id: new FormControl(uuidv4(), [Validators.required]),
    project_name: new FormControl('', [Validators.required]),
    hours_in_project: new FormControl('', [Validators.required]),
    time_records: new FormControl('', [Validators.required]),
    is_included: new FormControl('', [Validators.required]),
    integration_from: new FormControl('', [Validators.required]),
    created_by: new FormControl('', [Validators.required]),
    created_date: new FormControl(new Date(), [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    if (this.data) {
      this.addProjectForm.setValue(this.data);
      this.isEditMode = true;

      this.addProjectForm.controls['created_by']?.disable();
      this.addProjectForm.controls['project_name']?.disable();
    }
  }

  submitForm() {
    if (this.addProjectForm.valid) {
      const getProjectList: any = localStorage.getItem('project-list')
      if (getProjectList) {
        const list = JSON.parse(getProjectList)
        if (this.isEditMode) {
          const project = list.find((item: any) => (item.id === this.data.id));
          const formData = this.addProjectForm.value
          list.map((data: any) => {
            if (project.id === data.id) {
              data['hours_in_project'] = formData['hours_in_project'];
              data['time_records'] = formData['time_records'];
              data['is_included'] = formData['is_included'];
              data['integration_from'] = formData['integration_from'];
              data['description'] = formData['description'];
            }
          })
          localStorage.setItem('project-list', JSON.stringify(list as any))
          this.snackBar.open("Project has been Edited", 'close', {
            duration: 2000
          });
        } else {
          list.push(this.addProjectForm.value)
          this.snackBar.open("Project has been Added", 'close', {
            duration: 2000
          });
          localStorage.setItem('project-list', JSON.stringify(list as any))
        }
        this.onNoClick()
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close('submit');
  }
}
