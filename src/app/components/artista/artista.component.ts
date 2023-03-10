import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [],
})
export class ArtistaComponent {
  artista:any={}
  loading:boolean;
  topTracks:any[]=[]
  constructor(
    private activatedRoute: ActivatedRoute,
    private spotify: SpotifyService
  ) {
    this.loading=true;
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['id']);
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id: string) {
    console.log(id)
    this.spotify.getArtista(id).subscribe(artista => {
      console.log(artista);
      this.artista=artista;
      this.loading=false;
    });
  }

  getTopTracks(id:string){
    this.spotify.getTopTracks(id).subscribe((topTracks) => {
      console.log(topTracks);
      this.topTracks=topTracks;
    });
  }
}
