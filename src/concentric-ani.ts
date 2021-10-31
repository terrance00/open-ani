import { AniBase } from './abstractions/ani-base';
import paper from 'paper';
import { AniHelpers } from './helpers/ani-helpers';

export class ConcentricAni extends AniBase {
  private readonly _circles: paper.Path.Circle[] = [];

  constructor(element: HTMLElement) {
    super(element);
    this.StartAni();
  }

  private CreateElements(): void {
    const maxRadius: number = this.Height >= this.Width ? (this.Height - 10) / 2 : (this.Width - 10) / 2;

    let currentRadius: number = maxRadius;
    const strokeColor: paper.Color = new paper.Color('black');

    for (let i: number = 0; i < 4; i++) {
      const center: [x: number, y: number] = AniHelpers.GetCenterFromElement(this._element);
      const point: paper.Point = new paper.Point(center[0], center[1]);
      const circle: paper.Path.Circle = new paper.Path.Circle(point, currentRadius);
      circle.strokeWidth = 1;
      circle.strokeColor = strokeColor;

      this._circles.push(circle);

      currentRadius -= maxRadius / 4;
    }

  }

  protected StartAni(): void {
    if (this._circles.length === 0) this.CreateElements();
    this.DoAnimation(0);
  }

  private DoAnimation(index: number): void {
    let direction: 'up' | 'down' = 'up';

    const interval: number = window.setInterval(() => {
      if (direction === 'up') {
        this._circles[index].strokeWidth += 0.5;
        if (this._circles[index].strokeWidth === 4) {
          direction = 'down';
        }
      } else {
        this._circles[index].strokeWidth -= 0.5;
        if (this._circles[index].strokeWidth === 1) {
          clearInterval(interval);
          this.DoAnimation(index === 3 ? 0 : ++index);
        }
      }
    }, 16);
  }
}
