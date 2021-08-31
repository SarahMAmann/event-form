import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appWholeNumbersOnly]'
})
export class WholeNumbersOnlyDirective {
  private regex = /^\d+$/;
  private allowedKeys: string[] = [
    'Backspace',
    'Tab',
    'Shift',
    'Meta',
    'Control',
    'ArrowLeft',
    'ArrowRight',
    'End',
    'Home'
  ];

  constructor(private input: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (
      this.allowedKeys.indexOf(event.key) !== -1 ||
      // Allow: Ctrl+A - select all
      (event.key === 'a' && (event.ctrlKey || event.metaKey)) ||
      // Allow: Ctrl+C - copy
      (event.key === 'c' && (event.ctrlKey || event.metaKey)) ||
      // Allow: Ctrl+V - paste
      (event.key === 'v' && (event.ctrlKey || event.metaKey)) ||
      // Allow: Ctrl+X - cut
      (event.key === 'x' && (event.ctrlKey || event.metaKey))
    ) {
      return;
    }

    const current: string = this.input.nativeElement.value;
    const next: string = current.concat(event.key);

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const value = event.clipboardData.getData('text');

    if (value && !String(value).match(this.regex)) {
      event.preventDefault();
    }
  }
}
