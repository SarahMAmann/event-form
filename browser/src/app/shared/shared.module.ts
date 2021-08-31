import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { InputRestrictionDirective } from './directives/special-char-input.directive';
import { WholeNumbersOnlyDirective } from './directives/whole-numbers-only.directive';
import { DecimalNumbersDirective } from './directives/decimal-numbers.directive';

@NgModule({
  declarations: [
    PhoneMaskDirective,
    InputRestrictionDirective,
    WholeNumbersOnlyDirective,
    DecimalNumbersDirective
  ],
  exports: [
    PhoneMaskDirective,
    InputRestrictionDirective,
    WholeNumbersOnlyDirective,
    DecimalNumbersDirective
  ],
  imports: [CommonModule]
})
export class SharedModule {}
