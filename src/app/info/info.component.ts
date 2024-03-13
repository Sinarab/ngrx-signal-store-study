import { Component, signal } from '@angular/core';
import { interval, map, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'info',
  standalone: true,
  imports: [
    MatFormField, MatLabel, MatInput,
    MatIcon, FormsModule, MatButtonModule, MatSuffix
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {

  counterLabel = signal('Current second: 0');
  readonly counter = rxMethod(
    pipe(
      map((y: number) => `Current second: ${y + 1}`),
      tap((y: string) => this.counterLabel.set(y))
    )
  )

  counter2Label = signal('Current second: 0');
  readonly counter2 = rxMethod(
    pipe(
      map((y: number) => `Stop when reach 10s: ${y + 1}`),
      tap((y: string) => this.counter2Label.set(y))
    )
  )

  currentValue = signal(0);
  result = signal(0);
  value = '';
  readonly calcPow = rxMethod(
    pipe(
      map((x: number) => x * x),
      tap((x: number) => this.result.set(x))
    )
  );

  constructor() {
    // Each invocation of the reactive method pushes
    // the input value through the reactive chain. When called
    // with a static value, the reactive chain executes once.
    this.calcPow(this.currentValue);

    // When a reactive method is called with an observable,
    // the reactive chain is executed every time the observable
    // emits a new value.
    const interval$ = interval(1000);
    this.counter(interval$);
    this.counter2(interval$);

    // If a reactive method needs to be cleaned up before the injector
    // is destroyed, manual cleanup can be performed by calling the unsubscribe method.
    setTimeout(() => {
      // 👇 Clean up the second reactive method subscription after 10 seconds.
      this.counter2.unsubscribe();
    }, 10000);
  }

  onCalcPow() {
    this.currentValue.set(+this.value);
  }
}
