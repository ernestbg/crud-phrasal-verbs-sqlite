import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PhrasalVerbsService } from '../services/phrasal-verbs.service';
import { PhrasalVerb } from '../interfaces/phrasal-verb.interface';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';



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
      .pipe(finalize(() => this.handleClose()))
      .subscribe({
        error: error => {
          console.error('Error al agregar phrasal verb:', error);
        }
      });
  }

  private updatePhrasalVerb(phrasalVerb: PhrasalVerb) {
    this.phrasalVerbsService.updatePhrasalVerb(this.inputData.id, phrasalVerb)
      .pipe(finalize(() => this.handleClose()))
      .subscribe({
        error: error => {
          console.error('Error al actualizar phrasal verb:', error);
        }
      });
  }

  private handleClose() {
    this.modalForm.reset();
    this.matDialogRef.close();
    window.location.reload();
  }


  closeModalForm() {
    this.matDialogRef.close('closing');
  }
}
