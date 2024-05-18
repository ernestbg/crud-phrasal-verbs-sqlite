import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { PhrasalVerb } from '../../interfaces/phrasal-verb.interface';
import Swal from 'sweetalert2';
import { PhrasalVerbsService } from '../../services/phrasal-verbs.service';
import { UpdateModalFormComponent } from '../../components/update-modal-form/update-modal-form.component';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})


export class DetailsPageComponent implements OnInit {


  public phrasalVerb?: PhrasalVerb;
  phrasalVerb$!: Observable<PhrasalVerb>;

  constructor(
    private phrasalVerbsService: PhrasalVerbsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.phrasalVerb$ = this.activatedRoute.params.pipe(
      switchMap(({ id, definitionId }) => this.phrasalVerbsService.getPhrasalVerbById(id, definitionId))
    );
    this.phrasalVerb$.subscribe({
      next: (phrasalVerb: PhrasalVerb) => {
        if (!phrasalVerb) return this.router.navigate(['/dashboard/phrasal-verbs-sqlite']);
        this.phrasalVerb = phrasalVerb;
        console.log(this.phrasalVerb)
        return;
      },
      error: (error) => {
        console.error('Error al obtener el documento:', error);
      }
    });

  }


  openUpdateModalForm() {
    const phrasalVerbId = this.activatedRoute.snapshot.params['id'];
    const definitionId = this.activatedRoute.snapshot.params['definitionId'];
    this.dialog.open(UpdateModalFormComponent, {
      width: '40%',
      height: '400px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
      data: {
        id: phrasalVerbId,
        definitionId: definitionId
      }
    });
  }

  



  deletePhrasalVerb(): void {
    // Recupera los parámetros de la ruta: phrasalVerbId y definitionId
    const phrasalVerbId = this.activatedRoute.snapshot.params['id'];
    const definitionId = this.activatedRoute.snapshot.params['definitionId'];

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to reverse this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llama al método deletePhrasalVerb del servicio pasando ambos IDs
        this.phrasalVerbsService.deletePhrasalVerb(phrasalVerbId, definitionId)
          .pipe(
            tap({
              next: () => {
                // Eliminación exitosa
                console.log('Phrasal verb and definition deleted successfully.');
                // Redirige a la página de phrasal verbs
                this.router.navigate(['/dashboard/phrasal-verbs-sqlite']);
                // Muestra un mensaje de éxito
                Swal.fire({
                  icon: 'success',
                  title: 'Deleted!',
                  showConfirmButton: false,
                  timer: 1500
                });
              },
              error: (error) => {
                // Error al eliminar el phrasal verb y la definición
                console.error('Error deleting phrasal verb and definition:', error);
                // Muestra un mensaje de error
                Swal.fire('Error!', 'Failed to delete the phrasal verb and definition.', 'error');
              }
            })
          )
          .subscribe();
      }
    });
  }

}





