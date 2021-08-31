import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDecimalNumbers]'
})
export class DecimalNumbersDirective {
  private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]{0,2}){0,1}$/g);
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
    // If key contained in allowedKeys array is entered, return and don't perform validation

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

  @HostListener('blur', ['$event'])
  onBlur(event: any) {
    const current: string = this.input.nativeElement.value;
    if (current.length === 0) {
      return;
    }
    // If the user entered a decimal as the last char, slice it off
    if (current[current.length - 1] === '.') {
      this.input.nativeElement.value = current.replace('.', '');
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
