import { animate, state, style, transition, trigger } from '@angular/animations';

export const openCloseAnimationHeader = [
  trigger('openCloseHeader', [
    state(
      'open',
      style({
        transform: 'translateY(0)',
      })
    ),
    state(
      'closed',
      style({
        transform: 'translateY(-100%)',
      })
    ),
    transition('open => closed', [animate('300ms')]),
    transition('closed => open', [animate('300ms')]),
  ]),
];
