import { AniBase } from './abstractions/ani-base';
import paper from 'paper';
import { AniHelpers } from './helpers/ani-helpers';

export class SpinningArcsAnni extends AniBase {
  private readonly _arcs: paper.Path.Arc[] = [];
  private _arcsCount = 0;
  constructor(element: HTMLElement, arcs: number = 5) {
    super(element);
    this._arcsCount = arcs;
    this.StartAni();
  }

  private CreateElements(): void {
    const color: paper.Color = new paper.Color('black');
    const center: [x: number, y:number]  = AniHelpers.GetCenterFromElement(this._element);
    let deg: number = 0;
    let degreesIncrement: number = (360 / this._arcsCount);
    let radius: number = this.Width >= this.Height ? (this.Width - 1) / 2 : (this.Height - 1) / 2;

    let radiusDecrement: number = radius / this._arcsCount;

    for (let i: number = 0; i < this._arcsCount; i++) {
      const start: paper.Point = new paper.Point(AniHelpers.TransformCenter(center, AniHelpers.GetPointOnCircle(radius, deg)));
      const middle: paper.Point = new paper.Point(AniHelpers.TransformCenter(center, AniHelpers.GetPointOnCircle(radius, deg + degreesIncrement / 2)));
      const end: paper.Point = new paper.Point(AniHelpers.TransformCenter(center, AniHelpers.GetPointOnCircle(radius, deg + degreesIncrement)));

      const arc: paper.Path.Arc = new paper.Path.Arc(start, middle, end);
      arc.strokeWidth = 1;
      arc.strokeColor = color;

      this._arcs.push(arc);
      deg += degreesIncrement / 2;
      radius -= radiusDecrement;
    }
  }

  protected StartAni(): void {
    this.CreateElements();
    this.DoAnimation();
  }

  protected DoAnimation(): void {
    const center: paper.Point = new paper.Point(AniHelpers.GetCenterFromElement(this._element));
    window.setInterval(() => {
      for (let i: number = 0; i < this._arcs.length; i++) {
        this._arcs[i].rotate(8, center);
      }
    }, 16);
  }
}
