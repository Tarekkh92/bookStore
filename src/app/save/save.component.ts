import { Component, OnInit, Inject } from '@angular/core';
import { booksService } from '../shared/service/books.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormField } from '@angular/material';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Book } from '../shared/models/Book.model';


@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {

    publishedDate: string;
    public authorNameControl: FormControl;
    public bookTitleControl: FormControl;
    public publishedDateControl: FormControl;
    private sub: Subscription;
    public SaveForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<SaveComponent>,private booksService: booksService,@Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
      this.dialogRef.close();
     }
  
    ngOnInit() {
    this.authorNameControl = new FormControl("", Validators.required);
    this.bookTitleControl = new FormControl("", Validators.required);
   
    this.SaveForm = new FormGroup({
        authorControl: this.authorNameControl,
        titleControl: this.bookTitleControl,
    });
    }

    addBook() {
        // this.publishedDate = new Date().toLocaleDateString()+" at: "+new Date().toLocaleTimeString();
        var feedback = new Book(0, this.authorNameControl.value,null, this.bookTitleControl.value);
        this.sub =  this.booksService.addBookAsync(feedback).subscribe();
        this.dialogRef.close();
         window.location.reload();
      }
    
}
