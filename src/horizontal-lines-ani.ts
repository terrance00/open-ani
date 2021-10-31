import { AniBase } from './abstractions/ani-base';
import paper from 'paper';
import { AniHelpers } from './helpers/ani-helpers';

export class HorizontalLinesAni extends AniBase {
  private readonly _lines: paper.Path.Line[] = [];
  private _linesCount = 0;
  constructor(element: HTMLElement, lines: number = 5) {
    super(element);
    this._linesCount = lines;
    this.StartAni();
  }

  private CreateElements(): void {
    const color: paper.Color = new paper.Color('black');
    const center: [x: number, y:number]  = AniHelpers.GetCenterFromElement(this._element);

    let heightIncrement = this.Height / (this._linesCount + 1);

    for (let i: number = 1; i <= this._linesCount; i++) {
      let start: paper.Point = new paper.Point(0, heightIncrement * i);
      let end: paper.Point = new paper.Point(this.Width / 2, heightIncrement * i);
      var line = new paper.Path.Line(start, end);
      line.strokeColor = color;
      line.strokeWidth = 1;
      this._lines.push(line);
    }

  }

  protected StartAni(): void {
    this.CreateElements();
    this.DoAnimation();
  }

  protected DoAnimation(): void {
    const center: paper.Point = new paper.Point(AniHelpers.GetCenterFromElement(this._element));

    const directions: number[] = this._lines.map(() => 0);
    const started: boolean[] = this._lines.map(() => false);

    started[0] = true;

    window.setInterval(() => {
      for (let i: number = 0; i < this._lines.length; i++) {
        if (!started[i])
          return;
        if (directions[i] === 0) {
          this._lines[i].position.x++;

          if (this._lines[i].position.x > this.Width * 0.75) {
            directions[i] = 1;
          }

        } else {
          this._lines[i].position.x--;

          if (this._lines[i].position.x <= this.Width * 0.25) {
            directions[i] = 0;
          }
        }
      }
    }, 16);

    let timeout: number = 80;
    for (let i = 1; i < started.length; i++) {
      window.setTimeout(() => {
        started[i] = true;
      }, timeout)
      timeout += 80;
    }

  }
}
