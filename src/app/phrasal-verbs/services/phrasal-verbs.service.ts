import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { PhrasalVerb } from '../interfaces/phrasal-verb.interface';
//import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class PhrasalVerbsService {

  private baseUrl = 'http://localhost:3000/api/phrasal-verbs'; // Ajusta la URL según corresponda

  constructor(private http: HttpClient) { }


  getAllPhrasalVerbs(): Observable<PhrasalVerb[]> {
    return this.http.get<PhrasalVerb[]>(this.baseUrl);
  }



  /*  getTotalItems(): Observable<number> {
    return this.angularFirestore.collection('/PhrasalVerbs').get().pipe(
      map(collection => collection.size)
    );
  } */
  getPhrasalVerbById(id: string): Observable<PhrasalVerb> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<PhrasalVerb>(url);
  }

  /* searchPhrasalVerbs(searchTerm: string): Observable<PhrasalVerb[]> {
    return this.angularFirestore.collection<PhrasalVerb>('/PhrasalVerbs', ref =>
      ref.where('headword', '>=', searchTerm)
        .where('headword', '<=', searchTerm + '\uf8ff')
        .orderBy('headword')
    ).valueChanges({ idField: 'id' });
  } */


  addPhrasalVerb(phrasalVerb: PhrasalVerb): Observable<PhrasalVerb> {
    return this.http.post<PhrasalVerb>(this.baseUrl, phrasalVerb);
  }


  updatePhrasalVerb(id: string, phrasalVerb: PhrasalVerb): Observable<PhrasalVerb> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<PhrasalVerb>(url, phrasalVerb);
  }

  deletePhrasalVerb(id: string): void {
    const url = `${this.baseUrl}/${id}`;
    this.http.delete(url).subscribe(
      () => {
        console.log('Phrasal verb deleted successfully.');
      },
      (error) => {
        console.error('Error deleting phrasal verb:', error);
      }
    );
  }

}
