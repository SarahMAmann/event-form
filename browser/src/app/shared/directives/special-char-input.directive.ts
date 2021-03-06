import { Directive, ElementRef, HostListener, Input } from '@angular/core';
    @Directive({
        selector: '[appInputRestriction]'
    })

    // this directive allows only alphanumeric characters, and also prevents pasting of special characters

    export class InputRestrictionDirective {
        inputElement: ElementRef;

        // tslint:disable-next-line: no-input-rename
        @Input('appInputRestriction') appInputRestriction: string;
        arabicRegex = '[\u0600-\u06FF]';

        constructor(el: ElementRef) {
            this.inputElement = el;
        }

        @HostListener('keypress', ['$event']) onKeyPress(event) {
            if (this.appInputRestriction === 'noSpecialChars') {
                this.noSpecialChars(event);
            }
        }

        noSpecialChars(event) {
            const e = event as KeyboardEvent;
            if (e.key === 'Tab' || e.key === 'TAB') {
                return;
            }
            let k;
            k = event.keyCode;
            if ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57)) {
                return;
            }
            // tslint:disable-next-line: deprecation
            const ch = String.fromCharCode(e.keyCode);
            const regEx = new RegExp(this.arabicRegex);
            if (regEx.test(ch)) {
                return;
            }
            e.preventDefault();
        }

        @HostListener('paste', ['$event']) onPaste(event) {
            let regex;
            if (this.appInputRestriction === 'integer') {
                regex = /[0-9]/g;
            } else if (this.appInputRestriction === 'noSpecialChars') {
                regex = /[a-zA-Z0-9\u0600-\u06FF]/g;
            }
            const e = event as ClipboardEvent;
            const pasteData = e.clipboardData.getData('text/plain');
            let m;
            let matches = 0;
            // tslint:disable-next-line: no-conditional-assignment
            while ((m = regex.exec(pasteData)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    matches++;
                });
            }
            if (matches === pasteData.length) {
                return;
            } else {
                e.preventDefault();
            }
        }

    }
