import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  email = "danial@sred.io";
  email2 = "success@sred.io";
  @Output() dateRange = new EventEmitter<string>();

  readonly range: any = new FormGroup({
    start: new FormControl<Date | null>(new Date("01-01-2024")),
    end: new FormControl<Date | null>(new Date("12-31-2024")),
  });


  onChangeDate(): void {
    if (this.range.valid) {
      if (this.range.value.start && this.range.value.end) {
        this.dateRange.emit(this.range.value)

      }
    }
  }
}
