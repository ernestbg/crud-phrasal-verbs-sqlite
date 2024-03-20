import { Component, Input, OnInit } from '@angular/core';
import { PhrasalVerb } from '../../interfaces/phrasal-verb.interface';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { PhrasalVerbsService } from '../../services/phrasal-verbs.service';
import { ModalFormComponent } from '../../components/modal-form.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  public phrasalVerbs: PhrasalVerb[] = [];
  public filteredPhrasalVerbs: PhrasalVerb[] = [];
  public searchTerm: string = '';
  public totalItems: number = 0;

  constructor(private phrasalVerbsService: PhrasalVerbsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPhrasalVerbs();

    /*  this.phrasalVerbsService.getAllPhrasalVerbs()
       .pipe(
         tap((phrasalVerbs: any[]) => {
           this.phrasalVerbs = phrasalVerbs.map((e: any) => {
             const data = e.payload.doc.data();
             data.id = e.payload.doc.id;
             return data;
           });
           this.filteredPhrasalVerbs = this.phrasalVerbs;
         })
       )
       .subscribe({
         error: err => {
           console.log('Error while fetching data:' + err);
         }
       }); */

    /*  this.phrasalVerbsService.getTotalItems().subscribe(total => {
       this.totalItems = total;
     }); */
  }

  getAllPhrasalVerbs(): void {
    this.phrasalVerbsService.getAllPhrasalVerbs()
      .subscribe(phrasalVerbs => {
        this.phrasalVerbs = phrasalVerbs;
        this.filteredPhrasalVerbs = this.phrasalVerbs;
      });
  }

  search() {
    this.filteredPhrasalVerbs = this.phrasalVerbs.filter(phrasalVerb =>
      phrasalVerb.headword?.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).sort((a, b) => {
      const headwordA = a.headword?.toLowerCase() || '';
      const headwordB = b.headword?.toLowerCase() || '';
      return headwordA.localeCompare(headwordB);
    });
  }

  openModalForm(title: string, id?: any) {
    this.dialog.open(ModalFormComponent, {
      width: '40%',
      height: '400px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
      data: {
        title: title,
        id: id
      }
    });
  }

  editPhrasalVerb(id: any) {
    this.openModalForm('Edit', id);
  }

  addPhrasalVerb() {
    this.openModalForm('Add', '');
  }
}
