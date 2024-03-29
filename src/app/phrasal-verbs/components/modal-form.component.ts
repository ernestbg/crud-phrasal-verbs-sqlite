import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PhrasalVerbsService } from '../services/phrasal-verbs.service';
import { PhrasalVerb } from '../interfaces/phrasal-verb.interface';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  inputData: any;
  closeMessage = 'close';
  editMode: boolean = false; // Variable para distinguir entre modo de edición y modo de creación

  modalForm = this.formBuilder.group({
    headword: this.formBuilder.control(''),
    definition: this.formBuilder.control(''),
    example: this.formBuilder.control(''),
    level: this.formBuilder.control(''),
    sublevel: this.formBuilder.control(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<ModalFormComponent>,
    private formBuilder: FormBuilder,
    private phrasalVerbsService: PhrasalVerbsService
  ) { }

  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.id) {
      this.editMode = true; // Establecer el modo de edición si hay un ID
      this.setModalData(this.inputData.id);
    }
  }

  setModalData(id: string) {
    this.phrasalVerbsService.getPhrasalVerbById(id)
      .subscribe(phrasalVerb => {
        this.modalForm.setValue({
          headword: phrasalVerb.headword,
          definition: phrasalVerb.definition,
          example: phrasalVerb.example,
          level: phrasalVerb.level,
          sublevel: phrasalVerb.sublevel,
        });
      });
  }

  savePhrasalVerb() {
    const phrasalVerb = this.buildPhrasalVerb();
    if (this.editMode) {
      this.updatePhrasalVerb(phrasalVerb);
    } else {
      this.addPhrasalVerb(phrasalVerb);
    }
  }

  private buildPhrasalVerb(): PhrasalVerb {
    return {
      headword: this.modalForm.value.headword || '',
      definition: this.modalForm.value.definition || '',
      example: this.modalForm.value.example || '',
      level: this.modalForm.value.level || '',
      sublevel: this.modalForm.value.sublevel || ''
    };
  }
  private addPhrasalVerb(phrasalVerb: PhrasalVerb) {
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


  private updatePhrasalVerb(phrasalVerb: PhrasalVerb) {
    this.phrasalVerbsService.updatePhrasalVerb(this.inputData.id, phrasalVerb)
      .pipe(finalize(() => this.handleClose('Phrasal verb updated successfully!')))
      .subscribe({
        error: error => {
          console.error('Error al actualizar phrasal verb:', error);
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
