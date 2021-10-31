export class AniHelpers {
  public static GetCenterFromElement(element: HTMLElement): [x: number, y: number] {
    const result: [x: number, y: number] = [element.clientWidth / 2, element.clientHeight / 2];
    return result;
  }
}
