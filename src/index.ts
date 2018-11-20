import { fromEvent } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';


const inputElement: HTMLInputElement = document.querySelector('input') as HTMLInputElement;
const resultElement: HTMLDivElement = document.querySelector('#result') as HTMLDivElement;

const input$ = fromEvent(inputElement, 'input');

// @ts-ignore
input$.pipe(debounceTime(600), switchMap((event: KeyboardEvent) => {
    return fetch(`https://api.github.com/search/repositories?q=${(event.target as HTMLInputElement).value}`)
        .then(response => response.json());
})).subscribe((response: any) => response.items.map((item: any) => {
    resultElement.insertAdjacentHTML("beforeend", `<li><a href="${item.html_url}">${item.full_name}</a></li>`)
}));
