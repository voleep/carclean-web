import { animate, group, query, style } from '@angular/animations';

export function slideTo(direction: 'left' | 'right') {
  const optional = { optional: true };
  return [
    style({ position: 'relative', overflow: 'hidden' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          bottom: 0,
          [direction]: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%' })]),
    group([
      query(
        ':leave',
        [animate('200ms ease', style({ [direction]: '100%' }))],
        optional
      ),
      query(':enter', [animate('300ms ease', style({ [direction]: '0%' }))]),
    ]),
  ];
}
