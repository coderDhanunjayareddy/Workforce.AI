import { DemoController } from "./DemoController";
import { DemoPlayer } from "./DemoPlayer";
import { TourOverlay } from "./TourOverlay";

export function DemoOverlay() {
  return (
    <>
      <DemoPlayer />
      <TourOverlay />
      <DemoController />
    </>
  );
}
