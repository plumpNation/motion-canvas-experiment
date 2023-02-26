import {makeProject} from '@motion-canvas/core/lib';

import planets from './scenes/planets?scene';

export default makeProject({
  scenes: [planets],
  background: '#141414',
});
