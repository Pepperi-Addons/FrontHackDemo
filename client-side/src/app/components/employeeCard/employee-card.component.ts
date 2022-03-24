import { Component, OnInit, Injectable, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'employee-card',
    templateUrl: './employee-card.component.html',
    styleUrls: ['./employee-card.component.scss']
})

@Injectable()
export class EmployeeCardComponent implements OnInit {
    
    backgroundSRC = null;
    emp1SRC ='';
    emp2SRC ='';

    constructor(private dialogRef: MatDialogRef<EmployeeCardComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {          
    }   
  
    ngOnInit(): void {

    const dialog = document.getElementsByClassName("pep-dialog")[0];
    dialog.classList.remove('pep-dialog');

       this.backgroundSRC = this.data.imagePath + '/icons/BackImage.jpeg';
       this.emp1SRC = this.data.imagePath + '/employees/' + 'yoni.m.jpg';
       this.emp2SRC = this.data.imagePath + '/employees/' + 'chazky.h.jpg';
    }

    close(event){
        this.dialogRef?.close();
    }

    addFolder(event){
        this.dialogRef?.close();
    }

}