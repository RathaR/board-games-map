import {COLORS} from '../../constants/common';

export function getColorModifier(block, color) {
  const modifiers = {
    [COLORS.RED]: 'red',
    [COLORS.BLACK]: 'black',
    [COLORS.WHITE]: 'white',
    [COLORS.BLUE]: 'blue',
    [COLORS.GREEN]: 'green',
    [COLORS.GOLD]: 'gold',
  };

  return `${block}--${modifiers[color]}`;
}
