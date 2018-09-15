import{Book} from "../models/Book.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'


@Injectable()

export class booksService{
    constructor(private httpClient:HttpClient){}

    public getBooksAsync():Observable<Book[]>{
        return this.httpClient.get("http://localhost:3000/books")
        .do(books => console.log(books)) 
        .map((books:Book[])=>books);
        
    }
    public addBookAsync(book): Observable<Book[]>{

        return this.httpClient.post("http://localhost:3000/books",book).map((books:Book[])=>books);

    }
    public getOneBookAssync(id): Observable<Book[]>{

        return this.httpClient.get("http://localhost:3000/books/"+id).map((books:Book[])=>books);

    }
    public updateBookAssync(id,book):Observable<Book[]> {
       
        return this.httpClient.put("http://localhost:3000/books/"+id,book).map((books:Book[])=>books);
        
    }
    public deleteBookassync(id): Observable<Book[]>{

        return this.httpClient.delete("http://localhost:3000/books/"+id).map((books:Book[])=>books);

    }


}