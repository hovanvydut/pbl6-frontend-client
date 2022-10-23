import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostBookingComponent } from '@app/modules/post/components/post-booking/post-booking.component';

@Component({
  selector: 'app-landlord-profile',
  templateUrl: './landlord-profile.component.html',
  styleUrls: ['./landlord-profile.component.scss']
})
export class LandlordProfileComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onBookingCalendarButtonClicked() {
    let dialogRef = this.dialog.open( PostBookingComponent, {
      width: '99vw',
      maxHeight: '99vh',
      data: {
        postId: 1
      }
    });
  }
}
