import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../shared/models/Book.model';
import { booksService } from '../shared/service/books.service';
import { MatDialog } from '@angular/material';
import { SaveComponent } from '../save/save.component';
import { EditComponent } from '../edit/edit.component';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

    public books: Book[];
    public oneBook:Book[];
    private sub: Subscription;
    public id: string;
    public authorName:string;
    public bookTitle:string;
    public publishedDate;
    isPopupOpened = true;

    constructor(private bookService: booksService,private dialog?: MatDialog) { }
    
    ngOnInit() {
  
      this.sub = this.bookService.getBooksAsync().subscribe(books => this.books = books)
    }
    ngOnDestroy(): void {
  
      this.sub.unsubscribe();
    }
  
    
     
    editBook(id,authorName,bookTitle,publishedDate){
        this.isPopupOpened = true;
        var target = id.target || id.srcElement || id.currentTarget;
        var idAttr = target.attributes.id;
        var value = idAttr.nodeValue;
        this.id = value;
        this.authorName=authorName;
        this.bookTitle=bookTitle;
        this.publishedDate=publishedDate;
       
        const dialogRef = this.dialog.open(EditComponent, {
           
          data: 
          {
            id:this.id,
            authorName:this.authorName,
            bookTitle:this.bookTitle,
            publishedDate:this.publishedDate

          }
        });
    }
    deleteBook(id){
        this.isPopupOpened = true;
        var target = id.target || id.srcElement || id.currentTarget;
        var idAttr = target.attributes.id;
        var value = idAttr.nodeValue;
        this.id = value;
        const dialogRef = this.dialog.open(DeleteComponent, {
           
          data: 
          {
            id:this.id

          }
        });
    }
    addBook() {
        this.isPopupOpened = true;
        const dialogRef = this.dialog.open(SaveComponent, {
          data: {}
        });
   
    

}
}
