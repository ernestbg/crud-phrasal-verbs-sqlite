import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PhrasalVerbsService } from '../../services/phrasal-verbs.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-modal-form',
  templateUrl: './add-modal-form.component.html',
  styleUrls: ['./add-modal-form.component.css']
})
export class AddModalFormComponent implements OnInit  {

  inputData: any;
  closeMessage = 'close';

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
    private phrasalVerbsService: PhrasalVerbsService
  ) { }

  ngOnInit(): void {
    this.inputData = this.data;
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

  addPhrasalVerb() {
    const phrasalVerb = {
      headword: this.modalForm.value.headword || '',
      definition: this.modalForm.value.definition || '',
      examples: this.modalForm.value.examples || [''],
      level: this.modalForm.value.level || ''
    }
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
              text: 'Phrasal verb already exist.',
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
