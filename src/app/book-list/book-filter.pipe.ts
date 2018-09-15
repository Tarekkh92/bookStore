import { PipeTransform, Pipe } from "@angular/core";
import { Book } from "../shared/models/Book.model";

@Pipe({
    name:'bookFilter'
})

export class bookFilterPipe implements PipeTransform{
    transform(books:Book[],searchTerm:string):Book[]{
        if(!books || !searchTerm){
            return books;
        }
        return books.filter(book=>book.bookTitle.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1 )
    }
    
}