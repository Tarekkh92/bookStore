import { PipeTransform, Pipe } from "@angular/core";
import { Book } from "../shared/models/Book.model";

@Pipe({
    name:'bookTitleReplace'
})

export class bookTitlePipe implements PipeTransform{
    str1 :string;
    transform(str:string):string{
        // line removes all the non-alphanumeric and non '+' symbols.
        this.str1=str.replace(/[^a-zA-Z0-9+]/g, "");
        return this.str1;
       
    
    
}
}