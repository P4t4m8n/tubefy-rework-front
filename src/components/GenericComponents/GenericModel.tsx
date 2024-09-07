import { MouseEvent, RefObject, useRef } from "react";
import { useModel } from "../../hooks/useModel";
import { useNavigate } from "react-router-dom";
import { IGenericModelItem } from "../../models/app.model";
import { useModelPosition } from "../../hooks/useModelPosition";
import GenericBtn from "./GenericBtn";

interface Props {
  item: IGenericModelItem;
  container: RefObject<HTMLDivElement>;
  className?: string;
}

export default function GenericModel({ item, container, className }: Props) {
  // const modelRef = useRef<HTMLDivElement>(null);
  // const modelParentRef = useRef<HTMLUListElement>(null);

  // const [isModelOpen, setIsModelOpen] = useModel(modelRef);
  // const { modelPosition, handleMouseClick } = useModelPosition({
  //   width: 0,
  //   height: 0,
  // });
  // const navigate = useNavigate();

  // // const { items, btnSvg, btnText, modelSize, imgUrl } = item;

  // const onModelBtnClick = (ev: MouseEvent) => {
  //   ev.stopPropagation();
  //   handleMouseClick(modelRef, modelSize, container);
  //   setIsModelOpen((prev) => !prev);
  // };

  // const handleClick = async (
  //   ev: MouseEvent,
  //   item?: (ev: MouseEvent) => void
  // ) => {
  //   ev.stopPropagation();
  //   ev.preventDefault();
  //   if (item) {
  //     item(ev);
  //     setIsModelOpen(false);
  //   }
  //   return;
  // };

  // const handleLink = (ev: MouseEvent, link?: string) => {
  //   ev.stopPropagation();
  //   ev.preventDefault();

  //   if (!link) {
  //     navigate("/");
  //     return;
  //   }
  //   navigate(link);
  //   setIsModelOpen(false);
  //   return;
  // };

  // return (
  //   <div ref={modelRef} className={"generic-model-con " + className}>
  //     <GenericBtn
  //       onModelBtnClick={onModelBtnClick}
  //       {...(imgUrl ? { imgUrl } : { btnSvg: btnSvg! })}
  //       text={btnText}
  //       className={className}
  //     />

  //     <ul
  //       style={{
  //         top: modelPosition.height,
  //         left: modelPosition.width,
  //         display: isModelOpen ? "flex" : "none",
  //       }}
  //       className="generic-model"
  //       ref={modelParentRef}
  //     >
  //       {items &&
  //         items.map((item, index) => (
  //           <li key={index}>
  //             {!item.items && item.link && (
  //               <GenericBtn
  //                 onModelBtnClick={(ev) => handleLink(ev, item.link)}
  //                 text={item.btnText}
  //                 btnSvg={item.btnSvg!}
  //                 className={`${className}-link`}
  //               />
  //             )}
  //             {!item.items && item.onClick && (
  //               <GenericBtn
  //                 onModelBtnClick={(ev) => handleClick(ev, item.onClick)}
  //                 text={item.btnText}
  //                 {...(item.imgUrl
  //                   ? { imgUrl: item.imgUrl! }
  //                   : { btnSvg: item.btnSvg! })}
  //                 className={`${className}-button`}
  //               />
  //             )}

  //             {item.items && (
  //               <GenericModel
  //                 item={item.items}
  //                 btnSvg={item.btnSvg}
  //                 btnText={item.btnText}
  //                 className={`${className}-sub-model`}
  //                 modelSize={item.modelSize}
  //                 container={container}
  //               />
  //             )}
  //           </li>
  //         ))}
  //     </ul>
  //   </div>
  // );
}
