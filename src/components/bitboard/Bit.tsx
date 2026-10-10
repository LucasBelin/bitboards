import { memo } from "react";
import { useUpdateBit } from "../../stores/bitboardStore";

type BitPropsEnabled = {
  id: string;
  index: number;
  state: boolean;
  disabled?: false;
};

type BitPropsDisabled = {
  id?: string;
  index: number;
  state: boolean;
  disabled: true;
};

type BitProps = BitPropsEnabled | BitPropsDisabled;

const Bit = memo(function Bit(props: BitProps) {
  const updateBit = useUpdateBit();

  if (props.disabled) {
    return (
      <input
        disabled={true}
        type="checkbox"
        checked={props.state}
        className="w-3 h-3"
      />
    );
  }

  const { id, index, state } = props;
  return (
    <input
      type="checkbox"
      checked={state}
      className="w-3 h-3 cursor-pointer"
      onChange={(e) => updateBit(id, index, e.target.checked)}
    />
  );
});

export default Bit;
