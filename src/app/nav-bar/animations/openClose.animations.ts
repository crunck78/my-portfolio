import { animate, state, style, transition, trigger } from "@angular/animations";

export const openCloseAnimationMenu = [
    trigger('openCloseMenu', [
        state('open', style({
            height: '100vh',
        })),
        state('closed', style({
            height: '0px'
        })),
        transition('open => closed', [
            animate('300ms')
        ]),
        transition('closed => open', [
            animate('300ms')
        ]),
    ]),
];

export const openCloseAnimationToggler = [
    trigger('openCloseTogglerFirst', [
        state('open', style({
            transform: 'rotate(40deg)',
            position: 'relative',
            top: '16.5px'
        })),
        state('closed', style({
            transform: 'rotate(0deg)',
            position: 'relative',
            top: '0'
        })),
        transition('open => closed', [
            animate('300ms')
        ]),
        transition('closed => open', [
            animate('300ms')
        ]),
    ]),
    trigger('openCloseTogglerLast', [
        state('open', style({
            transform: 'rotate(-40deg)',
            position: 'relative',
            bottom: '17.5px'
        })),
        state('closed', style({
            transform: 'rotate(0deg)',
            position: 'relative',
            bottom: '0'
        })),
        transition('open => closed', [
            animate('300ms')
        ]),
        transition('closed => open', [
            animate('300ms')
        ]),
    ]),
    trigger('openCloseTogglerMiddle', [
        state('open', style({
            opacity: 0
        })),
        state('closed', style({
            opacity: 1
        })),
        transition('open => closed', [
            animate('300ms')
        ]),
        transition('closed => open', [
            animate('300ms')
        ]),
    ]),
];