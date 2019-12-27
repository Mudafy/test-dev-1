import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Question } from 'src/app/services/question';
import { Broker } from 'src/app/services/broker';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  action:string;
  localData:any;
  email = new FormControl('', [Validators.required, Validators.email]);


  constructor(
      private modalRef: MatDialogRef<ModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data :Question ) {
        this.localData = {...data}; 
        this.action = this.localData.action;   

  }

  brokerList: Broker[] = [
    {name: 'Faralla', id: 1},
    {name: 'Fasebonne', id: 2},
    {name: 'Icortese', id: 3},
    {name: 'Perez', id: 6},
    {name: 'Gonzalez', id: 40}
  ];
 
  ngOnInit() {
  }

  //Realizamos la accion que corresponda
  acceptAction(){
    this.modalRef.close({event:this.action,data:this.localData});
  }

  //Cerramos el modal.
  cancelAction(){
    this.modalRef.close({event:'Cancel'});
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'El email ingresado no tiene un formato válido' : '';
  }
  

}
