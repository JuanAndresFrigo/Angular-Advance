import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() {
    // this.retornaObservable()
    //   .pipe(retry(2))
    //   .subscribe(
    //     (valor) => console.log('Subs', valor),
    //     (error) => console.warn('Error', error),
    //     () => console.info('Obs terminado')
    //   );

    this.intervalSubs = this.retornaintervalo().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaintervalo():Observable<number> { 
    return interval(100).pipe(
      map((valor) => valor + 1),
      filter(valor => valor % 2 === 0),
      // take(10),
    );

  }

  retornaObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('llego a 2');
        }
      }, 1000);
    });

    return obs$;
  }
}
