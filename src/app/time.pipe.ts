import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform {
  transform(secs: number) {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${this.addZero(minutes)}:${this.addZero(seconds)}`;
  }

  addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }
}
