import { useEffect, useRef, useState } from "react";
import { Loader } from "../../loader";

export function SmNav({ navButtons }) {
  const smNavContentRef = useRef();
  const [smNavActive, setSmNavActive] = useState(false);
  useEffect(() => {
    if (smNavActive) {
      smNavContentRef.current.style.maxHeight =
        smNavContentRef.current.scrollHeight + "px";
    } else {
      smNavContentRef.current.style.maxHeight = 0;
    }
  }, [smNavActive]);

  return (
    <div id="nav-sm">
      <div id="nav-sm-control">
        <button
          className="smNav-button"
          onClick={() => {
            setSmNavActive(!smNavActive);
          }}
        >
          {smNavActive ? "Close" : "Menu"}
        </button>
        {/*<span*/}
        {/*  className={`triangle triangle-${smNavActive ? "up" : "down"}`}*/}
        {/*></span>*/}
        <Loader />
      </div>
      <div id="nav-sm-content" ref={smNavContentRef}>
        <div id="nav-sm-buttons-list">{navButtons}</div>
      </div>
    </div>
  );
}
