import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
  }
  token: string =
    'B QB4AsbbWPSeToT0dePSltadsh2O4bozpqBIFKCjilmX1g0I3MPIAFdSopXWOxy_rhkI1EbIAGkrYXvMnGzMk81Rf6UAkCMBP06ZOkKEAbjcDAK0aPE';

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(url, { headers });
  }
  getNewReleases() {
    // const headers = new HttpHeaders({
    //   Authorization:
    //     'Bearer BQCxlhhZI16GxsHVp82eDl2a298OwGhekeTa-VISaLasr7IZnoM98-HMvfK80HaIyl6NhEyFXKR3CIU5uywXbCe1DNi7NIjAMDprNwTH58G35iOcBsA',
    // });

    return this.getQuery('browse/new-releases').pipe(
      map((data: any) => {
        return data['albums'].items;
      })
    );
    // return this.http
    //   .get('https://api.spotify.com/v1/browse/new-releases', {
    //     headers,
    //   })
    //   .pipe(
    //     map((data: any) => {
    //       return data['albums'].items;
    //     })
    //   );
    // .subscribe((data) => {
    //   console.log(data);
    // });
  }

  getArtista(id: string) {
    // const headers = new HttpHeaders({
    //   Authorization:
    //     'Bearer BQCLL7f1aH92LDBZSPZcgheEmdtqrqDsmOAXRNEYI1ZRKzqr7x6YBG8Adwe2p-WLeIKZIuy3-12E4-MQcANBbn8Pb_C0jrZwvl2QjycE2OS3AbG_OgA',
    // });

    return this.getQuery(`artists/${id}`);
    // .pipe(
    //   map((data: any) => {
    //     return data['artists'].items;
    //   })
    // );

    // return this.http
    //   .get(`https://api.spotify.com/v1/search?q=${termino}&type=artist`, {
    //     headers,
    //   })
    //   .pipe(
    //     map((data: any) => {
    //       return data['artists'].items;
    //     })
    //   );
  }
  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist`).pipe(
      map((data: any) => {
        return data['artists'].items;
      })
    );
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?market=CO`).pipe(
      map((data: any) => {
        return data['tracks'];
      })
    );
  }
}
