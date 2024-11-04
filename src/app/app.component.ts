import { Component, linkedSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    $names = signal<string[]>([]);
    $namesCount = linkedSignal(()=> this.$names().length);

    addName(name:string){
      this.$names.update(names=>[...names, name]);S
    }
}
