import { Component, OnInit, Injectable, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'employee-card',
    templateUrl: './employee-card.component.html',
    styleUrls: ['./employee-card.component.scss']
})

@Injectable()
export class EmployeeCardComponent implements OnInit {
    
    public folderName: string = '';
    constructor(private dialogRef: MatDialogRef<EmployeeCardComponent>) {
       
    }
    ngOnInit(): void {
 
    }

    close(event){
        this.dialogRef?.close();
    }

    addFolder(event){
        this.dialogRef?.close(this.folderName);
    }

}