import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratioCounter'
})
export class RatioCounterPipe implements PipeTransform {

  transform(value: number, maxValue: number): string {
    const ratio = value / maxValue;
    const ratioRound = Math.floor(ratio * 100);
    const redRatio = 112;
    const greenRatio = 230 - Math.floor(ratio * 230);
    return `linear-gradient(to right, rgb(${redRatio}, ${greenRatio}, 28) 0%, rgb(${redRatio}, ${greenRatio}, 28) ${ratioRound}%, rgba(0,0,0,0) ${ratioRound}%, rgba(0,0,0,0) 100%)`;
  }

}
