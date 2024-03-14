import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { PhrasalVerb } from '../interfaces/phrasal-verb.interface';
//import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class PhrasalVerbsService {


  constructor() { }


  getAllPhrasalVerbs() {
  }

  /* getTotalItems(): Observable<number> {
    return this.angularFirestore.collection('/PhrasalVerbs').get().pipe(
      map(collection => collection.size)
    );
  }

  getPhrasalVerbById(id: string): Observable<any> {
    return this.angularFirestore.collection('/PhrasalVerbs').doc(id).valueChanges();
  }

  searchPhrasalVerbs(searchTerm: string): Observable<PhrasalVerb[]> {
    return this.angularFirestore.collection<PhrasalVerb>('/PhrasalVerbs', ref =>
      ref.where('headword', '>=', searchTerm)
        .where('headword', '<=', searchTerm + '\uf8ff')
        .orderBy('headword')
    ).valueChanges({ idField: 'id' });
  }

  addDocumentIfNotDuplicate(form: any) {
    const headwordValueToCheck = form.value.headword;
    const definitionValueToCheck = form.value.definition;
    const formData = { ...form.value }; // Hacer una copia de los datos del formulario

    this.checkDuplicateData(headwordValueToCheck, definitionValueToCheck)
      .pipe(take(1))
      .subscribe(isDuplicate => {
        if (!isDuplicate) {
          this.angularFirestore.collection('/PhrasalVerbs').add(formData)
            .then(() => {
              // Muestra una notificación de éxito
              Swal.fire({
                icon: 'success',
                title: 'Data added successfully',
                showConfirmButton: false,
                timer: 1500 // Duración en milisegundos
              });
            })
            .catch(error => {
              console.error('Error al agregar documento:', error);
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Document already exist, trying to add a duplicate!",
          });
        }
      });
  }

  checkDuplicateData(headwordValueToCheck: any, definitionValueToCheck: any) {
    return this.angularFirestore.collection('/PhrasalVerbs', ref =>
      ref.where('headword', '==', headwordValueToCheck)
        .where('definition', '==', definitionValueToCheck)
    )
      .valueChanges()
      .pipe(
        take(1),
        map(actions => actions.length > 0)
      );
  }



  deletePhrasalVerb(phrasalVerbId: string) {
    this.angularFirestore.collection('/PhrasalVerbs').doc(phrasalVerbId).delete()
      .then(() => {
        console.log('Documento eliminado correctamente');
      })
      .catch((error) => {
        console.error('Error al eliminar documento: ', error);
      });
  }

  updatePhrasalVerb(id: string, data: any) {
    this.angularFirestore.collection('/PhrasalVerbs').doc(id).update(data)
      .then(() => {
        console.log("Documento actualizado exitosamente!");
      })
      .catch(error => {
        console.error("Error al actualizar documento: ", error);
      });
  } */
}
