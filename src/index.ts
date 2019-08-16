import { fromEvent, from, Observable } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, map, filter, pluck } from 'rxjs/operators';


const inputElement: HTMLInputElement = document.querySelector('input') as HTMLInputElement;
const resultElement: HTMLDivElement = document.querySelector('.result') as HTMLDivElement;

const input$ = fromEvent(inputElement, 'input');

function request(param: string): Observable<any> {
    return from(fetch(`https://api.github.com/search/repositories?q=${param}`)
        .then((res: Response) => res.json()));
}

const inputS$ = input$.pipe(
    debounceTime(500),
    map(event => event.target.value),
    filter(event => event),
    distinctUntilChanged(),
    switchMap(request),
    pluck('items'),
);

inputS$.subscribe(res => {
    resultElement.innerHTML = '';
    res.map(item => {
        resultElement.insertAdjacentHTML('beforeend', `<li>${item.name} <a href="${item.url}">${item.url}</a></li>`);
    })
});
