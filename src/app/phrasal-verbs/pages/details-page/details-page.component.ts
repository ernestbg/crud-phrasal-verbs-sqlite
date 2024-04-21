import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { PhrasalVerb } from '../../interfaces/phrasal-verb.interface';
import Swal from 'sweetalert2';
import { PhrasalVerbsService } from '../../services/phrasal-verbs.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styles: [
  ]
})
export class DetailsPageComponent implements OnInit {
  public phrasalVerb?: PhrasalVerb;
  phrasalVerb$!: Observable<PhrasalVerb>;


  constructor(private phrasalVerbService: PhrasalVerbsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.phrasalVerb$ = this.activatedRoute.params.pipe(
      switchMap(({ id, definitionId }) => this.phrasalVerbService.getPhrasalVerbById(id, definitionId))
    );
    this.phrasalVerb$.subscribe({
      next: (phrasalVerb: PhrasalVerb) => {
        if (!phrasalVerb) return this.router.navigate(['/dashboard/phrasal-verbs-sqlite']);
        this.phrasalVerb = phrasalVerb;
        return;
      },
      error: (error) => {
        console.error('Error al obtener el documento:', error);
      }
    });
  }

  deletePhrasalVerb() {
    const id = this.activatedRoute.snapshot.params['id'];
    Swal.fire({
      title: '¿Are you sure?',
      text: "¡You won't be able to reverse this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llama al método deletePhrasalVerb del servicio y maneja la respuesta
        this.phrasalVerbService.deletePhrasalVerb(id)
          .pipe(
            tap({
              next: () => {
                // Eliminación exitosa
                console.log('Phrasal verb deleted successfully.');
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
                // Error al eliminar el phrasal verb
                console.error('Error deleting phrasal verb:', error);
                // Muestra un mensaje de error
                Swal.fire('Error!', 'Failed to delete the data.', 'error');
              }
            })
          )
          .subscribe();
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('/dashboard/phrasal-verbs-sqlite');
  }
}





