import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { Circle, View2D } from '@motion-canvas/2d/lib/components';
import { createRef } from '@motion-canvas/core/lib/utils';
import { all } from '@motion-canvas/core/lib/flow';
import { createSignal } from '@motion-canvas/core/lib/signals';

import { positionOnCircle } from '../libs/circle';
import { tween } from '@motion-canvas/core/lib/tweening';

interface Planet {
  size: number;
  color: string;
  speed: number;
  orbit: number;
}

const earth: Planet = { size: 100, color: 'blue', speed: 1, orbit: 300 }
const mars: Planet = { size: 80, color: 'red', speed: 0.5, orbit: 200 }

const planets = [
  earth,
  mars
]

export default makeScene2D(function* (view) {
  yield* all(
    createPlanet(view, earth),
    createPlanet(view, mars)
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

  yield* tween(seconds, () => {
    const { x, y } = positionOnCircle(planet.orbit, sig())

    ref().position([x, y]);

    let next = sig() + iteration;

    if (next > 360) {
      next = 1;
    }

    sig(next);
  });
}