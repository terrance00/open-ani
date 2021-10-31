import { ConcentricAni } from "./src/concentric-ani";
import { HorizontalLinesAni } from "./src/horizontal-lines-ani";
import { SpinningArcsAnni } from "./src/spinning-arcs";

const concentricAni = new ConcentricAni(<HTMLElement>document.getElementById("concentricCircles"));

const spinningArcs = new SpinningArcsAnni(<HTMLElement>document.getElementById("spinningArcs"));

const horizontalLines = new HorizontalLinesAni(<HTMLElement>document.getElementById("horizontalLines"));