import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { booksService } from '../shared/service/books.service';
import { Book } from '../shared/models/Book.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

    id: any;
    public publishedDate: String;
    public authorNameControl: FormControl;
    
    public bookTitleControl: FormControl;
    private sub: Subscription;
    public editForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<EditComponent>,private booksService: booksService,@Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
      this.dialogRef.close();
     }
     editBook(){
         this.id=this.data;
        this.publishedDate = new Date().toLocaleDateString()+" at: "+new Date().toLocaleTimeString();
        var feedback = new Book(0, this.authorNameControl.value,this.data['publishedDate'], this.bookTitleControl.value);
        this.sub =  this.booksService.updateBookAssync(this.data['id']  ,feedback).subscribe();
        this.dialogRef.close();
         window.location.reload();
    }
    ngOnInit() {
    
    this.authorNameControl = new FormControl(this.data['authorName'], Validators.required);
    this.bookTitleControl = new FormControl(this.data['bookTitle'], Validators.required);
    this.editForm = new FormGroup({
        authorNameControl: this.authorNameControl,
        bookTitleControl: this.bookTitleControl,
    });

   
    }
}
