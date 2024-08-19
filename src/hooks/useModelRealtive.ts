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
    if (!ref.current) return;

    document.addEventListener("click", checkClickOutside);
    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
  }, [open, ref]);

  const checkClickOutside = (ev: MouseEvent) => {
    if (!ev.target) return;
    if (!open) return;
    if (ref.current?.contains(ev.target as Node)) return;

    setOpen(false);
    if (callBack) callBack();
  };

  return [open, setOpen];
};
