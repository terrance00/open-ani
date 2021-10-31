
import paper from 'paper';

export abstract class AniBase {

  protected readonly _element: HTMLElement;
  protected _canvas: HTMLCanvasElement;
  protected readonly _project: paper.Project;

  protected get Width(): number {
    return this._canvas.width;
  }

  protected get Height(): number {
    return this._canvas.height;
  }

  constructor(element: HTMLElement) {
    this._element = element;
    this._canvas = document.createElement('canvas');
    this._element.appendChild(this._canvas);
    this._project = new paper.Project(this._canvas);
    this.InitializeCanvas();
  }

  private InitializeCanvas(): void {
    this._canvas.width = this._element.clientWidth;
    this._canvas.height = this._element.clientHeight;
  }

  protected abstract StartAni(): void;


}