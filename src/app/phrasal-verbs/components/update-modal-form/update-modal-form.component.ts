import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddModalFormComponent } from '../modal-form/add-modal-form.component';
import { FormArray, FormBuilder } from '@angular/forms';
import { PhrasalVerbsService } from '../../services/phrasal-verbs.service';
import { Observable, finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { PhrasalVerb } from '../../interfaces/phrasal-verb.interface';

@Component({
  selector: 'app-update-modal-form',
  templateUrl: './update-modal-form.component.html',
  styleUrls: ['./update-modal-form.component.css']
})
export class UpdateModalFormComponent {


  closeMessage = 'close';
  phrasalVerb?: PhrasalVerb;
  phrasalVerb$!: Observable<PhrasalVerb>;
  examplesArray: FormArray= this.formBuilder.array([]); 

  modalForm = this.formBuilder.group({
    headword: this.formBuilder.control(''),
    definition: this.formBuilder.control(''),
    examples: this.examplesArray,
    level: this.formBuilder.control(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<AddModalFormComponent>,
    private formBuilder: FormBuilder,
    private phrasalVerbsService: PhrasalVerbsService,
  ) { }

  ngOnInit(): void {
    this.setModalData();
  }

  setModalData(): void {
    const phrasalVerbId = this.data.id;
    const definitionId = this.data.definitionId;

    // Recupera el phrasal verb con la definición específica
    this.phrasalVerbsService.getPhrasalVerbById(phrasalVerbId, definitionId).subscribe(phrasalVerb => {
        // Establece los valores de los campos headword, definition, y level
        this.modalForm.patchValue({
            headword: phrasalVerb.headword,
            definition: phrasalVerb.definition,
            level: phrasalVerb.level
        });

        // Obtén el FormArray de examples del formulario
        const examplesArray = this.modalForm.get('examples') as FormArray;

        // Limpia el array de examples antes de añadir los ejemplos nuevos
        examplesArray.clear();

        // Añade un control para cada example de phrasalVerb.examples
        phrasalVerb.examples.forEach(example => {
            examplesArray.push(this.formBuilder.control(example));
        });
    });
}

  updatePhrasalVerb() {
    const phrasalVerbId = this.data.id;
    const definitionId = this.data.definitionId;
    const phrasalVerb = {
      headword: this.modalForm.value.headword || '',
      definition: this.modalForm.value.definition || '',
      level: this.modalForm.value.level || '',
      examples: this.modalForm.value.examples || ['']
    }
    this.phrasalVerbsService.updatePhrasalVerb(phrasalVerbId, definitionId, phrasalVerb)
      .pipe(finalize(() => this.handleClose('Phrasal verb updated successfully!')))
      .subscribe({
        error: error => {
          console.error('Error al actualizar phrasal verb:', error);
        }
      });
  }

  addExample(): void {
    const examplesArray = this.modalForm.get('examples') as FormArray;
    examplesArray.push(this.formBuilder.control(''));
  }

  // Método para eliminar un ejemplo
  removeExample(index: number): void {
    const examplesArray = this.modalForm.get('examples') as FormArray;
    examplesArray.removeAt(index);
  }




  


  private handleClose(title: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.modalForm.reset();
      this.matDialogRef.close();
      window.location.reload();
    });
  }

  closeModalForm() {
    this.matDialogRef.close('closing');
  }
}
