import type { LayoutKind } from "../../stores/bitboardStore";
import { getArrayFromLayout } from "../../utils/layout";

type LayoutProps = {
  layout: LayoutKind;
};

function LayoutPreview({ layout }: LayoutProps) {
  const array = getArrayFromLayout(layout);

  return (
    <div className="p-2 rounded-md border border-black shadow-sm w-fit h-fit">
      <div className="grid grid-cols-8 gap-x-2 gap-y-1">
        {array.map((index) => (
          <span key={`${layout}-${index}`} className="text-center">
            {index.toString().padStart(2, "0")}
          </span>
        ))}
      </div>
    </div>
  );
}

export default LayoutPreview;
