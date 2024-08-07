import { Dispatch, SetStateAction, useEffect, useState } from "react";
export const useModel = (
  ref: React.RefObject<
    | HTMLDivElement
    | HTMLButtonElement
    | HTMLFormElement
    | HTMLUListElement
    | HTMLLIElement
  >,
  callBack?: null | (() => void)
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", checkClickOutside);
    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
  }, [open, ref.current]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkClickOutside = (ev: any) => {
    console.log("(ref.current:", (ref.current))
    if (!ev.target) return;
    if (!open) return;
    if (ref.current?.contains(ev.target as Node)) return;


    setOpen(false);
    if (callBack) callBack();
  };
    console.log("open:", open)

  return [open, setOpen];
};
