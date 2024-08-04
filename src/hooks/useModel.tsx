import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
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
  const checkClickOutside = useCallback(
    (ev: MouseEvent) => {
      if (!ev.target) return;
      if (!open) return;

      if (ref.current?.contains(ev.target as Node)) return;

      setOpen(false);
      if (callBack) callBack();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref]
  );
  useEffect(() => {
    document.addEventListener("click", checkClickOutside);
    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
  }, [open, ref, checkClickOutside]);

  return [open, setOpen];
};
