import { animate, state, style, transition, trigger } from "@angular/animations";

export const toggleMeAnimation = trigger(
    'visibleHidden', [
    state('visible', style({
        opacity: '1',
        'z-index': '-1',
        // width: '100%',
        height: '50%'
    })),
    state('hidden', style({
        opacity: '0',
        'z-index': '-1',
        width: 0,
        height: 0
    })),
    transition('visible => hidden', [
        animate('300ms 3000ms')
    ]),
    transition('hidden => visible', [
        animate('300ms 3000ms')
    ]),
]
);

export const toggleIntroAnimation = trigger(
    'visibleHiddenIntro', [
    state('visible', style({
        width: '100%',
    })),
    state('hidden', style({
        width: 0
    })),
    transition('visible => hidden', [
        animate('300ms')
    ]),
    transition('hidden => visible', [
        animate('300ms')
    ]),
]
);

export const toggleButtonAnimation = trigger(
    'visibleHiddenButton', [
    state('visible', style({

    })),
    state('hidden', style({

    })),
    transition('visible => hidden', [
        animate('300ms 600ms')
    ]),
    transition('hidden => visible', [
        animate('300ms 600ms')
    ]),
]
);

export const toggleCurveAnimation = trigger(
    'visibleHiddenCurve', [
    state('visible', style({
        width: '1442px'
    })),
    state('hidden', style({
        width: 0
    })),
    transition('visible => hidden', [
        animate('300ms 600ms')
    ]),
    transition('hidden => visible', [
        animate('300ms 600ms')
    ]),
]
);