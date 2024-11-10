import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, linkedSignal, signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { Album } from "./models/album.model";
import { Photo } from "./models/photo.model";

@Injectable({providedIn:'root'})
export class DataService
{
    http = inject(HttpClient);
    $albums = computed(()=>this.albumsData.value());
    $selectedAlbum = signal<Album>({} as Album);
    $relatedPhotos = linkedSignal(()=>this.photosResource.value ?? []);


readonly albumsData = rxResource({
  loader:()=>{
        return this.http.get<Album[]>('https://jsonplaceholder.typicode.com/albums').pipe(map(albums=>albums.slice(0,3)));
    }
})


 readonly photosResource = rxResource({
  request:()=>(this.$selectedAlbum()),
  loader:({request})=>this.setReletedPhotos(request.id)
})

 readonly selectedPhotoTitle = rxResource({
  request:()=>(this.$selectedAlbum()),
  loader:({request})=>this.setReletedPhotos(request.id)
})

selectAlbum(album:Album){
  this.$selectedAlbum.set(album);
}

setReletedPhotos(albumId:number){
  console.log(albumId);
    return this.http.get<Photo[]>('https://jsonplaceholder.typicode.com/photos')?.pipe(map(photos=>photos.filter(p=>p.albumId == albumId)));
}

clearSelectedAlbum(){
  this.$selectedAlbum.set({} as Album)
}

}