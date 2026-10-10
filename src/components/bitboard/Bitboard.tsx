import { memo } from "react";
import Bit from "./Bit";
import {
  useBitboardUpdates,
  useClearBits,
  useFillBits,
} from "../../stores/bitboardStore";

type BitboardProps = {
  id: string;
  title: string;
  value: bigint;
  hex: string;
  dec: string;
  bin: string;
  table: number[][];
};

const Bitboard = memo(function Bitboard({
  id,
  title,
  value,
  hex,
  dec,
  bin,
  table,
}: BitboardProps) {
  const { setHex, setDec, setBin } = useBitboardUpdates();
  const fillBits = useFillBits();
  const clearBits = useClearBits();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan={9} className="text-center">
              <div className="flex justify-between items-center">
                <span>{title}</span>
                <div className="flex gap-2 font-normal">
                  <button
                    onClick={() => fillBits(id)}
                    className="border border-gray-500 rounded-sm px-4 shadow-sm cursor-pointer hover:bg-white/50 transition-colors"
                  >
                    Fill
                  </button>
                  <button
                    onClick={() => clearBits(id)}
                    className="border border-gray-500 rounded-sm px-4 shadow-sm cursor-pointer hover:bg-white/50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {table.map((row, i) => (
            <tr key={`${id}-row-${i}`}>
              <td>{8 - i}</td>
              {row.map((index) => (
                <td key={`${id}-col-${index}`}>
                  <Bit
                    id={id}
                    state={((value >> BigInt(index)) & 1n) === 1n}
                    index={index}
                  />
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td></td>
            {Array.from({ length: 8 }).map((_, i) => (
              <td key={`${id}-row-${i}`}>{String.fromCharCode(65 + i)}</td>
            ))}
          </tr>

          <tr>
            <td>hex:</td>
            <td colSpan={8} className="py-2">
              <input
                type="text"
                className="w-full box-border border border-gray-600 bg-white ml-1 px-1"
                value={hex}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9a-fA-F]/g, "");
                  if (!value || value.length === 0) value = "0";
                  setHex(id, value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td>dec:</td>
            <td colSpan={8} className="py-2">
              <input
                type="text"
                className="w-full box-border border border-gray-600 bg-white ml-1 px-1"
                value={dec}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9]/g, "");
                  if (!value || value.length === 0) value = "0";
                  setDec(id, value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td>bin:</td>
            <td colSpan={8} className="py-2">
              <input
                type="text"
                className="w-full box-border border border-gray-600 bg-white ml-1 px-1"
                value={bin}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^01]/g, "");
                  if (!value || value.length === 0) value = "0";
                  setBin(id, value);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default Bitboard;
