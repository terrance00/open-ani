import { AniBase } from './abstractions/ani-base';
import paper from 'paper';
import { AniHelpers } from './helpers/ani-helpers';
import { Layer } from 'paper/dist/paper-core';

export class ConcentricAni extends AniBase {
  private readonly Circles: paper.Path.Circle[] = [];

  constructor(element: HTMLElement) {
    super(element);
    this.StartAni();
  }

  private CreateElements(): void {
    const maxRadius: number = this.Height >= this.Width ? (this.Height - 2) / 2 : (this.Width - 2) / 2;

    let currentRadius: number = maxRadius;

    for (let i: number = 0; i < 3; i++) {
      const center: [x: number, y: number] = AniHelpers.GetCenterFromElement(this._element);
      const point: paper.Point = new paper.Point(center[0], center[1]);
      const circle: paper.Path.Circle = new paper.Path.Circle(point, currentRadius);
      circle.strokeWidth = 2;
      circle.strokeColor = new paper.Color("black");
      this.Circles.push();

      currentRadius -= maxRadius / 3;
    }

    const layer: paper.Layer = new Layer(this.Circles);
    this._project.addLayer(layer);
  }

  protected StartAni(): void {
    if (this.Circles.length === 0) this.CreateElements();

    this._project.view.onFrame = (event: paper.Event) => {
      this.onFrame(event);
    };
  }

  private onFrame(event: paper.Event): void {
    
  }

}
