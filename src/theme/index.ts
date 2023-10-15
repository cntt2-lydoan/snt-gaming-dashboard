import { preset } from './preset';
import { button } from './button';
import { box } from './box';
import { image } from './image';
import { input } from './input';
import { text } from './text';
import { link } from './link';
import { select } from './select';
import { checkbox } from './checkbox';

export const theme = {
  ...preset,
  ...text,
  breakpoints: ['480px', '768px', '1024px'],
  variants: {
    ...box,
    ...image,
    ...link,
  },
  ...input,
  ...select,
  ...checkbox,
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
    display: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: [5, 6, 7],
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  buttons: {
    primary: {
      fontSize: 2,
      fontWeight: 'bold',
      color: 'background',
      bg: 'primary',
      borderRadius: 'default',
    },
    secondary: {
      variant: 'buttons.primary',
      color: 'background',
      bg: 'secondary',
    },
    ...button,

  }
}
