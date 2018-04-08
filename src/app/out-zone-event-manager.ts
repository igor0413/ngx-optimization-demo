import { Injectable, Inject, NgZone } from '@angular/core';
import { EVENT_MANAGER_PLUGINS, EventManager } from '@angular/platform-browser';

@Injectable()
export class OutZoneEventManager extends EventManager {

  constructor(
    @Inject(EVENT_MANAGER_PLUGINS) plugins: any[],
    private zone: NgZone
  ) {
    super(plugins, zone);
  }

  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    // Поиск флага в названии события
    if(eventName.endsWith('out-zone')) {
      eventName = eventName.split('.')[0];
      // Обработчик события будет выполняться вне контекста Angular
      return this.zone.runOutsideAngular(() => {
        return super.addEventListener(element, eventName, handler);
      });
    }
    // Поведение по умолчанию
    return super.addEventListener(element, eventName, handler);
  }
}
