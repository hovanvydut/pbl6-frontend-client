import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-post-booking',
  templateUrl: './post-booking.component.html',
  styleUrls: ['./post-booking.component.scss']
})
export class PostBookingComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    phoneNumber: ['', Validators.required]
  });

  selectedDate: Date;
  selecteDateString = '';

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { postId: string }
  ) {}

  ngOnInit() {}

  handleSegmentSelected(date: Date) {
    this.selectedDate = date;
    this.selecteDateString = date.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'});
  }
}
