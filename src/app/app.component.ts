import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';
import { Album } from '../models/album.model';

@Component({
    selector: 'app-root',
    imports: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

  dataService = inject(DataService);
  $albums = this.dataService.$albums;
  $relatedPhotos = this.dataService.$relatedPhotos();

  onAlbumClick(album:Album){
    this.dataService.selectAlbum(album);
  }

  onClear(){
    this.dataService.clearSelectedAlbum()
  }
}
