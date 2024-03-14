import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PhrasalVerb } from '../../interfaces/phrasal-verb.interface';
//import Swal from 'sweetalert2';
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
    /* this.phrasalVerb$ = this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.phrasalVerbService.getPhrasalVerbById(id))
    );
    this.phrasalVerb$.subscribe({
      next: (phrasalVerb: PhrasalVerb) => {
        if (!phrasalVerb) return this.router.navigate(['/dashboard/phrasal-verbs-firestore']);
        this.phrasalVerb = phrasalVerb;
        console.log(phrasalVerb.example)
        return;
      },
      error: (error) => {
        console.error('Error al obtener el documento:', error);
      }
    }); */
  }

  deletePhrasalVerb() {
    /* const id = this.activatedRoute.snapshot.params['id'];
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
        this.phrasalVerbService.deletePhrasalVerb(id);
        this.router.navigate(['/dashboard/phrasal-verbs-firestore']);

        Swal.fire(
          'Deleted!',
          'The data has been deleted.',
          'success'
        );
      }
    }); */
  }

  goBack() {
    this.router.navigateByUrl('/dashboard/phrasal-verbs-firestore');
  } 
}





