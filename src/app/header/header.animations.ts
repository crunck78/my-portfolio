import { animate, state, style, transition, trigger } from "@angular/animations";

export const openCloseAnimationHeader = [
    trigger('openCloseHeader', [
        state('open', style({
           top: 0
        })),
        state('closed', style({
           top: '-100%'
        })),
        transition('open => closed', [
            animate('300ms')
        ]),
        transition('closed => open', [
            animate('300ms')
        ]),
    ]),
];