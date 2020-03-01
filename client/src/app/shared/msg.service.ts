import {ElementRef} from '@angular/core';

declare const M

export class MaterialMSG {
  static message(msg: string): void {
    M.toast({html: msg});
  }

  static floatingActionButton(el: ElementRef) {
    M.FloatingActionButton.init(el.nativeElement);
  }
}
