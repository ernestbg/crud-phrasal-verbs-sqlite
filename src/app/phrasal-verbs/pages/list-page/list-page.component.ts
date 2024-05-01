import { Component, OnInit } from '@angular/core';
import { PhrasalVerb } from '../../interfaces/phrasal-verb.interface';
import { MatDialog } from '@angular/material/dialog';
import { PhrasalVerbsService } from '../../services/phrasal-verbs.service';
import { ModalFormComponent } from '../../components/modal-form/modal-form.component';
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
      .subscribe({
        next: response => {
          // Transforma la respuesta recibida para ajustarla a la interfaz PhrasalVerb
          this.filteredPhrasalVerbs = this.transformPhrasalVerbs(response);
          this.phrasalVerbs = this.filteredPhrasalVerbs; // Opcional

          // Actualiza el número total de elementos
          this.totalItems = this.filteredPhrasalVerbs.length;
        },
        error: error => {
          console.error('Error al obtener los phrasal verbs:', error);
        },
      });
  }

  transformPhrasalVerbs(data: any[]): PhrasalVerb[] {
    // Inicializa un array para almacenar los datos transformados
    const transformedData: PhrasalVerb[] = [];

    // Itera sobre cada phrasal verb en la respuesta
    data.forEach(phrasalVerb => {
      // Itera sobre cada definición del phrasal verb
      phrasalVerb.definitions.forEach((definition: { id: any; definition: any; level: any; examples: any[]; }) => {
        // Crea un objeto que coincida con la interfaz PhrasalVerb
        const transformedPhrasalVerb: PhrasalVerb = {
          id: phrasalVerb.id,
          headword: phrasalVerb.headword,
          definitionId: definition.id,
          definition: definition.definition,
          level: definition.level || '',
          examples: definition.examples.map(example => example.example), // Mantén examples como un array de cadenas
        };

        // Verifica si el objeto transformado ya existe en transformedData
        const existingEntry = transformedData.find(
          item => item.headword === transformedPhrasalVerb.headword && item.definition === transformedPhrasalVerb.definition
        );

        // Si el objeto no existe, añádelo a transformedData
        if (!existingEntry) {
          transformedData.push(transformedPhrasalVerb);
        }
      });
    });

    // Devuelve el array de phrasal verbs transformados
    return transformedData;
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

  openModalForm(title: string, id?: string, definitionId?: string) {
    this.dialog.open(ModalFormComponent, {
      width: '40%',
      height: '400px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
      data: {
        title: title,
        id: id,
        definitionId: definitionId
      }
    });
  }

  editPhrasalVerb(id: any, definitionId: any) {
    this.openModalForm('Edit', id, definitionId);
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
