import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/shared/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications = [];
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getNotification().subscribe(
      res => {
        this.notifications = res;
      }
    )
  }

  maskReadAllNotitications() {
    
  }

}
