import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  //paises: any = [];
  nuevasCanciones: any[] = [];
  loading:boolean;
  error:boolean;
  mensajeError:string='';
  constructor(private spotify: SpotifyService) {
    //private http: HttpClient
    // this.http
    //   .get('https://restcountries.com/v3.1/lang/spa')
    //   .subscribe((resp) => {
    //     this.paises=resp;
    //     console.log(resp);
    //   });
    this.loading=true;
    this.error=false;

    this.spotify.getNewReleases().subscribe((data:any) => {
      console.log(data);
      this.nuevasCanciones=data;//.albums.items;
      this.loading=false;
    },(errorService=>{
      this.error=true;
      this.loading=false;
      console.log(errorService);
      this.mensajeError=errorService.error.error.message;
    }));
  }

  //ngOnInit(): void {}
}
