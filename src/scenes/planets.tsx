import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { Circle, View2D } from '@motion-canvas/2d/lib/components';
import { createRef } from '@motion-canvas/core/lib/utils';
import { all, every, loop, run } from '@motion-canvas/core/lib/flow';
import { createSignal } from '@motion-canvas/core/lib/signals';

import { positionOnCircle } from '../libs/circle';
import { tween } from '@motion-canvas/core/lib/tweening';

interface Planet {
  size: number;
  color: string;
  speed: number;
  orbit: number;
}

const mercury: Planet = { size: 20, color: 'firebrick', speed: 1, orbit: 120 }
const venus: Planet = { size: 30, color: 'violet', speed: 1.8, orbit: 150 }
const earth: Planet = { size: 40, color: 'blue', speed: 1.3, orbit: 175 }
const mars: Planet = { size: 30, color: 'red', speed: 1.6, orbit: 200 }
const jupiter: Planet = { size: 80, color: 'orange', speed: 2, orbit: 250 }
const saturn: Planet = { size: 80, color: 'orange', speed: 3, orbit: 300 }
const neptune: Planet = { size: 60, color: 'teal', speed: 4, orbit: 400 }

export default makeScene2D(function* (view) {
  view.add(
    <Circle
      width={175}
      height={175}
      fill={'yellow'}
    />,
  );

  yield* all(
    createPlanet(view, mercury),
    createPlanet(view, venus),
    createPlanet(view, earth),
    createPlanet(view, mars),
    createPlanet(view, jupiter),
    createPlanet(view, saturn),
    createPlanet(view, neptune),
  );
});

const createPlanet = function* (view: View2D, planet: Planet) {
  const ref = createRef<Circle>();
  const sig = createSignal(1);

  view.add(
    <Circle
      ref={ref}
      width={planet.size}
      height={planet.size}
      fill={planet.color}
    />,
  );

  const seconds = 2 * (planet.speed + 1);
  const iteration = (360 / (seconds * 30));

  yield* loop(3, () => tween(seconds, () => {
    const { x, y } = positionOnCircle(planet.orbit, sig())

    ref().position([x, y]);

    let next = sig() + iteration;

    if (next > 360) {
      next = 1;
    }

    sig(next);
  }));
}