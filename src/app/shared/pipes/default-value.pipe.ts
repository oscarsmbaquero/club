// src/app/pipes/default-value.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultValue',
  standalone: true // Agrega esto para hacer el pipe standalone
})
export class DefaultValuePipe implements PipeTransform {
  transform(value: any, fallback: string = '-'): string {
    return value ? value : fallback;
  }
}
