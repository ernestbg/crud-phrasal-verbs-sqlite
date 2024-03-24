import { Component, OnInit } from '@angular/core';
import { PhrasalVerb } from '../../interfaces/phrasal-verb.interface';
import { MatDialog } from '@angular/material/dialog';
import { PhrasalVerbsService } from '../../services/phrasal-verbs.service';
import { ModalFormComponent } from '../../components/modal-form.component';
import { PageEvent } from '@angular/material/paginator';

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
  public pageSize: number = 2; 
  public currentPage: number = 1;
  public pagedPhrasalVerbs: PhrasalVerb[] = []; // Esta es la lista de phrasal verbs a mostrar en la página actual

  constructor(private phrasalVerbsService: PhrasalVerbsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPhrasalVerbs();
  }

  getAllPhrasalVerbs(): void {
    this.phrasalVerbsService.getAllPhrasalVerbs()
      .subscribe(response => {
        this.phrasalVerbs = response.phrasalVerbs;
        this.filteredPhrasalVerbs = this.phrasalVerbs;
        this.totalItems = response.total;
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

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.currentPage = event.pageIndex + 1;
    // Aplicar filtro en la página actual
    this.pagedPhrasalVerbs = this.phrasalVerbs.filter(phrasalVerb =>
      phrasalVerb.headword?.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).sort((a, b) => {
      const headwordA = a.headword?.toLowerCase() || '';
      const headwordB = b.headword?.toLowerCase() || '';
      return headwordA.localeCompare(headwordB);
    }).slice(startIndex, endIndex);
  }
}
