import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DecimalPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-staff-details-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgIf,
    NgClass,
    DecimalPipe,
  ],
  templateUrl: './staff-details-modal.component.html',
  styleUrl: './staff-details-modal.component.scss'
})
export class StaffDetailsModalComponent {
  readonly dialogRef = inject(MatDialogRef<any>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  tab = 'hours';
  rendering_system = 0;
  unclaimed = 0;

  select(item: string): void {
    this.tab = item;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
