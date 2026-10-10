import { memo } from "react";
import Bit from "./Bit";

type BitboardResultProps = {
  table: number[][];
  value: bigint;
  title: string;
};

const BitboardResult = memo(function BitboardResult({
  table,
  value,
  title,
}: BitboardResultProps) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan={9} className="text-center">
              <span>{title}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {table.map((row, i) => (
            <tr key={`${title}-row-${i}`}>
              <td>{8 - i}</td>
              {row.map((index) => (
                <td key={`${title}-col-${index}`}>
                  <Bit
                    state={((value >> BigInt(index)) & 1n) === 1n}
                    index={index}
                    disabled
                  />
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td></td>
            {Array.from({ length: 8 }).map((_, i) => (
              <td key={`${title}-row-${i}`}>{String.fromCharCode(65 + i)}</td>
            ))}
          </tr>

          <tr>
            <td>hex:</td>
            <td colSpan={8} className="py-2">
              <input
                disabled
                type="text"
                className="w-full box-border border border-gray-600 bg-white/50 cursor-not-allowed ml-1 px-1"
                value={value.toString(16).toUpperCase()}
              />
            </td>
          </tr>

          <tr>
            <td>dec:</td>
            <td colSpan={8} className="py-2">
              <input
                disabled
                type="text"
                className="w-full box-border border border-gray-600 bg-white/50 cursor-not-allowed ml-1 px-1"
                value={value.toString(10)}
              />
            </td>
          </tr>

          <tr>
            <td>bin:</td>
            <td colSpan={8} className="py-2">
              <input
                disabled
                type="text"
                className="w-full box-border border border-gray-600 bg-white/50 cursor-not-allowed ml-1 px-1"
                value={value.toString(2)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default BitboardResult;
