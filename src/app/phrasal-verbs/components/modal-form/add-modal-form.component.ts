import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PhrasalVerbsService } from '../../services/phrasal-verbs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-modal-form',
  templateUrl: './add-modal-form.component.html',
  styleUrls: ['./add-modal-form.component.css']
})
export class AddModalFormComponent implements OnInit {

  inputData: any;
  closeMessage = 'close';

  examplesArray: FormArray = this.formBuilder.array([]);

  modalForm = this.formBuilder.group({
    headword: this.formBuilder.control(''),
    phonetics: this.formBuilder.control(''),
    definition: this.formBuilder.control(''),
    definitionTranslation: this.formBuilder.control(''),
    level: this.formBuilder.control(''),
    guideword: this.formBuilder.control(''),
    dialect: this.formBuilder.control(''),
    register: this.formBuilder.control(''),
    examples: this.examplesArray
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<AddModalFormComponent>,
    private formBuilder: FormBuilder,
    private phrasalVerbsService: PhrasalVerbsService
  ) { }

  ngOnInit(): void {
    this.inputData = this.data;
    this.addExample();
  }

  addExample(): void {
    const examplesArray = this.modalForm.get('examples') as FormArray;
    const exampleGroup = this.formBuilder.group({
      text: this.formBuilder.control(''),
      translation: this.formBuilder.control('')
    });
    examplesArray.push(exampleGroup);
  }

  removeExample(index: number): void {
    const examplesArray = this.modalForm.get('examples') as FormArray;
    examplesArray.removeAt(index);
  }

  addPhrasalVerb() {
    const phrasalVerb = {
      headword: this.modalForm.value.headword || '',
      phonetics: this.modalForm.value.phonetics || '',
      definition: this.modalForm.value.definition || '',
      definitionTranslation: this.modalForm.value.definitionTranslation || '',
      level: this.modalForm.value.level || '',
      guideword: this.modalForm.value.guideword || '',
      dialect: this.modalForm.value.dialect || '',
      register: this.modalForm.value.register || '',
      examples: this.modalForm.value.examples || []
    };

    this.phrasalVerbsService.addPhrasalVerb(phrasalVerb)
      .subscribe({
        next: () => {
          this.handleClose('Phrasal verb added successfully!');
        },
        error: error => {
          console.error('Error al agregar phrasal verb:', error);
          if (error.status === 500 && error.error && error.error.error === 'Error al insertar el phrasal verb') {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Phrasal verb already exists.',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.closeModalForm();
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Se produjo un error al agregar el phrasal verb.',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.closeModalForm();
            });
          }
        }
      });
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
