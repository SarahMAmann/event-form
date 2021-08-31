import { Component, OnInit } from '@angular/core';
import { BandsService } from '@app/bands/services/bands.service';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.scss']
})
export class BandListComponent implements OnInit {

  band: string;
  bands: Array<any>;
  constructor(
    private bandService: BandsService
  ) { }

  ngOnInit(): void {
    this.bandService.getBandsList$()
      .subscribe(bands => {
        this.bands = bands
        console.log(this.bands);
      });
  }

  onTestButtonClick() {
    console.log('clicked');
  }

}
