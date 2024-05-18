import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddModalFormComponent } from '../modal-form/add-modal-form.component';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  examplesArray: FormArray = this.formBuilder.array([]);

  modalForm = this.formBuilder.group({
    headword: this.formBuilder.control(''),
    phonetics: this.formBuilder.control(''),
    guideword: this.formBuilder.control(''),
    dialect: this.formBuilder.control(''),
    register: this.formBuilder.control(''),
    definition: this.formBuilder.control(''),
    definitionTranslation: this.formBuilder.control(''),
    level: this.formBuilder.control(''),
    examples: this.examplesArray,
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
      // Establece los valores de los campos del formulario
      this.modalForm.patchValue({
        headword: phrasalVerb.headword,
        phonetics: phrasalVerb.phonetics,
        guideword: phrasalVerb.guideword,
        dialect: phrasalVerb.dialect,
        register: phrasalVerb.register,
        definition: phrasalVerb.definition,
        definitionTranslation: phrasalVerb.definitionTranslation,
        level: phrasalVerb.level
      });

      // Limpia el array de examples antes de añadir los ejemplos nuevos
      const examplesArray = this.modalForm.get('examples') as FormArray;
      examplesArray.clear();

      // Añade un control para cada example de phrasalVerb.examples
      phrasalVerb.examples.forEach(example => {
        examplesArray.push(this.createExampleGroup(example));
      });
    });
  }

  createExampleGroup(example: any = { text: '', translation: '' }): FormGroup {
    return this.formBuilder.group({
      text: this.formBuilder.control(example.text),
      translation: this.formBuilder.control(example.translation)
    });
  }

  updatePhrasalVerb() {
    const phrasalVerbId = this.data.id;
    const definitionId = this.data.definitionId;
    const phrasalVerb = {
      headword: this.modalForm.value.headword || '',
      phonetics: this.modalForm.value.phonetics || '',
      guideword: this.modalForm.value.guideword || '',
      dialect: this.modalForm.value.dialect || '',
      register: this.modalForm.value.register || '',
      definition: this.modalForm.value.definition || '',
      definitionTranslation: this.modalForm.value.definitionTranslation || '',
      level: this.modalForm.value.level || '',
      examples: this.modalForm.value.examples || []
    };
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
    examplesArray.push(this.createExampleGroup());
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
