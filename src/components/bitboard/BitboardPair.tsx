import { memo } from "react";
import type { BitboardState } from "../../stores/bitboardStore";
import Bitboard from "./Bitboard";

type BitboardPairProps = {
  first: BitboardState;
  second: BitboardState;
};

const BitboardPair = memo(function BitboardPair({
  first,
  second,
}: BitboardPairProps) {
  return (
    <div className="flex items-center gap-10">
      <Bitboard
        id={first.id}
        title="First"
        value={first.value}
        hex={first.hex}
        dec={first.dec}
        bin={first.bin}
        table={first.table}
      />
      <Bitboard
        id={second.id}
        title="Second"
        value={second.value}
        hex={second.hex}
        dec={second.dec}
        bin={second.bin}
        table={second.table}
      />
    </div>
  );
});

export default BitboardPair;
