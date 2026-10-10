import {
  layoutKinds,
  useBitboardPairs,
  useCreateBitboardPair,
  useSetLayout,
} from "../../stores/bitboardStore";
import { LayoutPreview } from "../layout";
import BitboardPair from "./BitboardPair";
import BitboardResult from "./BitboardResult";

function Bitboards() {
  const pairs = useBitboardPairs();
  const createBitboardPair = useCreateBitboardPair();
  const setLayout = useSetLayout();

  return (
    <div className="flex flex-col gap-8">
      {pairs.map((pair, index) => (
        <div
          key={`bitboard-pair-${index}`}
          className="flex justify-start gap-10"
        >
          <BitboardPair first={pair[0]} second={pair[1]} />
          <BitboardResult
            table={pair[0].table}
            value={pair[0].value & pair[1].value}
            title="AND"
          />
          <BitboardResult
            table={pair[0].table}
            value={pair[0].value | pair[1].value}
            title="OR"
          />
          <BitboardResult
            table={pair[0].table}
            value={pair[0].value ^ pair[1].value}
            title="XOR"
          />
          <div className="flex gap-10 items-center">
            <div className="flex flex-col gap-10">
              {layoutKinds.map((l) => (
                <div className="flex" key={l}>
                  <input
                    id={`layout-${l}-${pair[0].id}`}
                    name={`layout-${l}-${pair[0].id}`}
                    type="radio"
                    checked={l === pair[0].layout}
                    onChange={() => setLayout([pair[0].id, pair[1].id], l)}
                    className="cursor-pointer mr-2"
                  />
                  <label
                    htmlFor={`layout-${l}-${pair[0].id}`}
                    className="font-bold text-center cursor-pointer"
                  >
                    Layout {l.replace("_", " ")}
                  </label>
                </div>
              ))}
            </div>
            <LayoutPreview layout={pair[0].layout} />
          </div>
        </div>
      ))}
      <button
        onClick={createBitboardPair}
        className="border border-gray-500 rounded-sm px-4 shadow-sm cursor-pointer w-fit hover:bg-white/50 transition-colors"
      >
        Add bitboards
      </button>
    </div>
  );
}

export default Bitboards;
