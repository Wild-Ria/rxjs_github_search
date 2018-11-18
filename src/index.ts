import { from, fromEvent, Observable } from 'rxjs';
import { map, debounceTime, tap, distinctUntilChanged, filter } from 'rxjs/operators';


const inputElement: HTMLInputElement = document.querySelector('input') as HTMLInputElement;
const resultElement: HTMLDivElement = document.querySelector('#result') as HTMLDivElement;

function request$(searchString: string): Observable<any> {
    return from(fetch(`https://api.github.com/search/repositories?q=${searchString}`)
        .then((res: Response) => res.json()));
}

const reposSearch$ = fromEvent(inputElement, 'input').pipe(
    map(event => event.target.value),
    filter(query => query),
    debounceTime(1000),
    distinctUntilChanged(),
    tap(query => console.log(`${query}`))
})

reposSearch$.subscribe((data: string) => resultElement.innerHTML = data);
