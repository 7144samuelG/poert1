"use client"
import {FaCaretDown} from "react-icons/fa";
import {useState,useRef} from "react";

const markers=Array.from({length:83},(_,i)=>i);
export const Ruler=()=>{
      const[leftMargin,setLeftMargin]=useState(56);
      const [rightMargin,setRightMargin]=useState(56);

      const [isDraggingLeft,setIsDraggingLeft]=useState(false);
      const [isDraggingRight,setIsDraggingRight]=useState(false);

      const rulerRef=useRef<HTMLDivElement>(null);

      const handleMouseLeftDown=()=>{
        setIsDraggingLeft(true)
      }
      const handleMouseRightDown=()=>{
        setIsDraggingRight(true)
      }
      const handleMouseMove=(e:React.MouseEvent)=>{
        if((isDraggingLeft||isDraggingRight) &&rulerRef.current){
            const container=rulerRef.current.querySelector("#ruler-container");
            if(container){
                const containerRect=container.getBoundingClientRect();
                const relativeX=e.clientX-containerRect.left;
                const rawposition=Math.max(0,Math.min(816,relativeX));
                if(isDraggingLeft){
                    const maxLeftPostion=816-rightMargin-100;
                    const newLeftPostion=Math.min(rawposition,maxLeftPostion);
                    setLeftMargin(newLeftPostion);
                }
                else if(isDraggingRight){
                     const maxRightPostion=816-(leftMargin+100);
                    const newRightPosition=Math.max(816-rawposition,0);
                    const constrainedRightPosition=Math.min(newRightPosition,maxRightPostion);
                    setRightMargin(constrainedRightPosition);
                }
            }
        }
      }
      const handleMouseUp=()=>{
        setIsDraggingLeft(false);
        setIsDraggingRight(false);
      }
      const handleLeftDoubleClick=()=>{
       setLeftMargin(56)
      }
      const handleRightDoubleClick=()=>{
       setRightMargin(56)
      }
    return (
        <div 
          ref={rulerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        className="max-w-[816px] mx-auto h-7 border-b border-gray-600 flex flex-end relative select-none print:hidden">
        <div id="ruler-container" className=" w-full h-full relative">
            <Marker
              position={leftMargin}
              isLeft={true}
              isDragging={isDraggingLeft}
              isMouseDown={handleMouseLeftDown}
              onDoubleClick={handleLeftDoubleClick}
            
            />
            <Marker
              position={rightMargin}
              isLeft={false}
              isDragging={isDraggingRight}
              isMouseDown={handleMouseRightDown}
              onDoubleClick={handleRightDoubleClick}
            
            />
            <div className="absolute inset-x-0 bottom-0 h-full">
                <div className="h-full w-[816px] relative">
                    {
                        markers.map((marker,_index)=>{
                            const position=(marker*816)/82;
                            return(
                                <div key={_index} className="absolute bottom-0" style={{left:`${position}px`}}>
                                    {
                                        marker%10===0&&(
                                            <>
                                             <div className="absolute bottom-0 w-[1px] h-[4px] bg-neutral-500"/>
                                             <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                                                {
                                                    (marker/10)+1
                                                }
                                             </span>
                                            </>
                                        )
                                    }
                                     {
                                        marker%5==0 && marker% 10  !==0&&(
                                            <>
                                             <div className="absolute bottom-0 w-[1px] h-[2.5px] bg-neutral-500"/>
                                             
                                            </>
                                        )
                                    }
                                     {
                                        marker%5!==0&&(
                                            <>
                                             <div className="absolute bottom-0 w-[1px] h-[1px] bg-neutral-500"/>
                                             
                                            </>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </div>
    )
}
interface MarkerProps{
    position:number;
    isLeft:boolean;
    isDragging:boolean;
    isMouseDown:()=>void;
    onDoubleClick:()=>void;
};
const Marker=({position,isLeft,isDragging,isMouseDown,onDoubleClick}:MarkerProps)=>{
    return(
        <div className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group-ml-[2]"
         style={{[isLeft?"left":"right"]:`${position}px`}}
         onMouseDown={isMouseDown}
         onDoubleClick={onDoubleClick}
        >
            <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2"/>
            <div className="absolute left-1/2 top-4 transform -translate-x-1/2 transition-opacity duration-150"
            
            style={{
                height:"100vh",
                width:"1px",
                transform:"scaleX(0,5)",
                backgroundColor:"#3b72f6",
                display:isDragging?"block":"none"
            }}
            />
        </div>
    )
}