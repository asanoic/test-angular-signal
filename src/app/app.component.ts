import { ChangeDetectorRef, Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { firstValueFrom, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  abc = this.newSignal(" ... ");

  constructor(
    private cd: ChangeDetectorRef,
  ) {
    //
  }

  async btnClick(working: WritableSignal<any>): Promise<void> {
    // use update ok, but set wont work
    // working.set({value: false});
    working.update(x => {
      x.value = true;
      return x;
    });

    await firstValueFrom(timer(1000));

    // neither update nor set works
    // working.set({value: true});
    working.update(x => {
      x.value = false;
      return x;
    });

    // uncomment following line change detection happens
    // this.abc.set("changed"); 
  }

  newSignal(data: any): WritableSignal<any> {
    return signal(data, { equal: () => false });
  }
}
