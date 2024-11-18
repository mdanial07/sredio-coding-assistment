import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(new Date("11-08-2024")),
    end: new FormControl<Date | null>(new Date()),
  });
}
