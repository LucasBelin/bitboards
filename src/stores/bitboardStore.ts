import { create } from "zustand";
import { stringToBigint } from "../utils/bitboard";
import { useShallow } from "zustand/shallow";
import { getTableFromLayout } from "../utils/layout";

export const layoutKinds = [
  "LTR_ASC",
  "LTR_DESC",
  "RTL_ASC",
  "RTL_DESC",
] as const;

export type LayoutKind = (typeof layoutKinds)[number];

export type BitboardState = {
  id: string;
  layout: LayoutKind;
  table: number[][];
  value: bigint;
  hex: string;
  dec: string;
  bin: string;
};

type BitboardStore = {
  bitboards: BitboardState[];
  setLayout: (id: [string, string], layout: LayoutKind) => void;
  setHex: (id: string, str: string) => void;
  setDec: (id: string, str: string) => void;
  setBin: (id: string, str: string) => void;
  updateBit: (id: string, bitIndex: number, newState: boolean) => void;
  fillBits: (id: string) => void;
  clearBits: (id: string) => void;
  createBitboardPair: () => void;
};

const useBitboardStore = create<BitboardStore>((set) => ({
  bitboards: [
    {
      id: "default-1",
      layout: "LTR_ASC",
      table: getTableFromLayout("LTR_ASC"),
      value: 0n,
      hex: "0",
      dec: "0",
      bin: "0",
    },
    {
      id: "default-2",
      layout: "LTR_ASC",
      table: getTableFromLayout("LTR_ASC"),
      value: 0n,
      hex: "0",
      dec: "0",
      bin: "0",
    },
  ],
  setLayout: (ids, layout) => {
    const t = getTableFromLayout(layout);
    set((state) => {
      const idx1 = state.bitboards.findIndex((b) => b.id === ids[0]);
      const idx2 = state.bitboards.findIndex((b) => b.id === ids[1]);
      if (idx1 === -1 || idx2 === -1) return state;
      const bitboard1 = state.bitboards[idx1];
      const bitboard2 = state.bitboards[idx2];

      const newBitboards = [...state.bitboards];
      newBitboards[idx1] = {
        ...bitboard1,
        layout: layout,
        table: t,
      };
      newBitboards[idx2] = {
        ...bitboard2,
        layout: layout,
        table: t,
      };

      return { bitboards: newBitboards };
    });
  },
  setHex: (id, str) => {
    set((state) => {
      const index = state.bitboards.findIndex((bb) => bb.id === id);
      if (index === -1) return state;

      const normalized = str.toUpperCase();
      const { value: val, ok } = stringToBigint(16, normalized);
      const bitboard = state.bitboards[index];

      if (!ok || val === undefined) {
        const newBitboards = [...state.bitboards];
        newBitboards[index] = { ...bitboard, hex: normalized };
        return { bitboards: newBitboards };
      }

      const newBitboards = [...state.bitboards];
      newBitboards[index] = {
        ...bitboard,
        value: val,
        hex: normalized,
        dec: val.toString(10),
        bin: val.toString(2),
      };

      return { bitboards: newBitboards };
    });
  },
  setDec: (id, str) => {
    set((state) => {
      const index = state.bitboards.findIndex((bb) => bb.id === id);
      if (index === -1) return state;

      const normalized = str;
      const { value: val, ok } = stringToBigint(10, normalized);
      const bitboard = state.bitboards[index];

      if (!ok || val === undefined) {
        const newBitboards = [...state.bitboards];
        newBitboards[index] = { ...bitboard, hex: normalized };
        return { bitboards: newBitboards };
      }

      const newBitboards = [...state.bitboards];
      newBitboards[index] = {
        ...bitboard,
        value: val,
        hex: val.toString(16).toUpperCase(),
        dec: normalized,
        bin: val.toString(2),
      };

      return { bitboards: newBitboards };
    });
  },
  setBin: (id, str) => {
    set((state) => {
      const index = state.bitboards.findIndex((bb) => bb.id === id);
      if (index === -1) return state;

      const normalized = str;
      const { value: val, ok } = stringToBigint(2, normalized);
      const bitboard = state.bitboards[index];

      if (!ok || val === undefined) {
        const newBitboards = [...state.bitboards];
        newBitboards[index] = { ...bitboard, hex: normalized };
        return { bitboards: newBitboards };
      }

      const newBitboards = [...state.bitboards];
      newBitboards[index] = {
        ...bitboard,
        value: val,
        hex: val.toString(16).toUpperCase(),
        dec: val.toString(10),
        bin: normalized,
      };

      return { bitboards: newBitboards };
    });
  },
  fillBits: (id) => {
    const full = (1n << 64n) - 1n;
    set((state) => {
      const index = state.bitboards.findIndex((bb) => bb.id === id);
      if (index === -1) return state;

      const newBitboards = [...state.bitboards];
      newBitboards[index] = {
        ...newBitboards[index],
        value: full,
        hex: full.toString(16).toUpperCase(),
        dec: full.toString(10),
        bin: full.toString(2),
      };

      return { bitboards: newBitboards };
    });
  },
  clearBits: (id) => {
    set((state) => {
      const index = state.bitboards.findIndex((bb) => bb.id === id);
      if (index === -1) return state;

      const newBitboards = [...state.bitboards];
      newBitboards[index] = {
        ...newBitboards[index],
        value: 0n,
        hex: "0",
        dec: "0",
        bin: "0",
      };

      return { bitboards: newBitboards };
    });
  },
  updateBit: (id, bitIndex, newState) =>
    set((state) => {
      const bitboardIndex = state.bitboards.findIndex((bb) => bb.id === id);
      if (bitboardIndex === -1) return state;
      const oldValue = state.bitboards[bitboardIndex].value;

      const mask = (1n << BigInt(bitIndex)) & ((1n >> 64n) - 1n);
      const newValue = newState ? oldValue | mask : oldValue & ~mask;

      const newBitboards = [...state.bitboards];
      newBitboards[bitboardIndex] = {
        ...newBitboards[bitboardIndex],
        value: newValue,
        hex: newValue.toString(16).toUpperCase(),
        dec: newValue.toString(10),
        bin: newValue.toString(2),
      };

      return { bitboards: newBitboards };
    }),
  createBitboardPair: () => {
    const id1 = crypto.randomUUID();
    const id2 = crypto.randomUUID();
    set((state) => ({
      bitboards: [
        ...state.bitboards,
        {
          id: id1,
          layout: "LTR_ASC",
          table: getTableFromLayout("LTR_ASC"),
          value: 0n,
          hex: "0",
          dec: "0",
          bin: "0",
        },
        {
          id: id2,
          layout: "LTR_ASC",
          table: getTableFromLayout("LTR_ASC"),
          value: 0n,
          hex: "0",
          dec: "0",
          bin: "0",
        },
      ],
    }));
  },
}));

const useUpdateBit = () => useBitboardStore((state) => state.updateBit);
const useBitboardPairs = () => {
  const bitboards = useBitboardStore((state) => state.bitboards);
  const pairs: [BitboardState, BitboardState][] = [];

  if (bitboards.length % 2 !== 0) {
    console.error("Odd number of bitboards, cannot make pairs.");
    return pairs;
  }

  for (let i = 0; i < bitboards.length; i += 2) {
    const first = bitboards[i];
    const second = bitboards[i + 1];
    if (first && second) {
      pairs.push([first, second]);
    }
  }

  return pairs;
};

const useFillBits = () => useBitboardStore((state) => state.fillBits);
const useClearBits = () => useBitboardStore((state) => state.clearBits);
const useBitboardUpdates = () =>
  useBitboardStore(
    useShallow((state) => ({
      setHex: state.setHex,
      setDec: state.setDec,
      setBin: state.setBin,
    })),
  );
const useCreateBitboardPair = () =>
  useBitboardStore((state) => state.createBitboardPair);
const useSetLayout = () => useBitboardStore((state) => state.setLayout);

export {
  useBitboardPairs,
  useUpdateBit,
  useFillBits,
  useClearBits,
  useBitboardUpdates,
  useCreateBitboardPair,
  useSetLayout,
};
