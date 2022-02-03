import { Component, OnInit } from '@angular/core';
import { WatchService } from 'src/app/services/watch.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  constructor(private _watchService: WatchService) {}

  // Om det krånglar: kanske ändra till AfterViewInit?
  ngOnInit(): void {
    let test = this._watchService
      .getAllWatches()
      .subscribe((response) => console.log(response));
  }
}
