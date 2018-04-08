import { Observable } from 'rxjs/Observable';
import { animationFrame } from 'rxjs/scheduler/animationFrame.js';
import { Injectable } from '@angular/core';

@Injectable()
export class BeforeRenderService {

  private tasks: Array<() => void> = [];
  private running: boolean = false;

  constructor() {}

  public addTask(task: () => void) {
    this.tasks.push(task);
    this.run();
  }

  private run() {
    if (this.running) { return; }
    this.running = true;
    animationFrame.schedule(() => {
      this.tasks.forEach(x => x());
      this.tasks.length = 0;
      this.running = false;
    });
  }
}
