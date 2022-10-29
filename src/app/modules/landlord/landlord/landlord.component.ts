import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services/common.service';
import { ItemModel } from '@app/shared/models/base.model';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  roomTypes: ItemModel[] = [
    new ItemModel({
      id: null,
      name: 'Tất cả'
    })
  ];
  activeLink = this.roomTypes[0];

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.getRoomCategory();
  }

  getRoomCategory() {
    this.commonService.getRoomCategory().subscribe(val => {
      this.roomTypes = [...this.roomTypes, ...val];
    });
  }
}
