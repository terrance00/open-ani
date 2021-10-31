export class AniHelpers {
  public static GetCenterFromElement(element: HTMLElement): [x: number, y: number] {
    const result: [x: number, y: number] = [element.clientWidth / 2, element.clientHeight / 2];
    return result;
  }

  public static GetPointOnCircle(radius: number, deg: number): [x: number, y: number] {
    const radians: number = deg * (Math.PI / 180);

    return [radius * Math.sin(radians), radius * Math.cos(radians)];
  }

  public static TransformCenter(center: [x: number, y: number], point: [x: number, y: number]): [x: number, y: number] {
    return [center[0] - point[0], center[1] - point[1]];
  }
}
