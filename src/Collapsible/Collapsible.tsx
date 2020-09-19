import React, { useEffect, useRef } from "react";
import { PolymorphicComponent } from "../utils";

export type CollapsibleProps = {
  collapsed?: boolean;
};

function collapseElement(ref: HTMLElement) {
  const elementHeight = ref.scrollHeight;
  const t = ref.style.removeProperty("transition");

  requestAnimationFrame(() => {
    ref.style.height = elementHeight + "px";
    ref.style.transition = t;

    requestAnimationFrame(() => {
      ref.style.height = 0 + "px";
    });
  });
}

function expandElement(ref: HTMLElement) {
  // get the height of the element's inner content, regardless of its actual size
  const sectionHeight = ref.scrollHeight;

  // have the element transition to the height of its inner content
  ref.style.height = sectionHeight + "px";

  const transitionend = () => {
    ref.removeEventListener("transitionend", transitionend);
    ref.style.removeProperty("height");
  };

  ref.addEventListener("transitionend", transitionend, {
    once: true,
  });
}

const Collapsible: PolymorphicComponent<CollapsibleProps> = ({
  as,
  collapsed,
  ...props
}) => {
  const ref = useRef<any>();
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      if (collapsed) {
        ref.current.style.height = "0px";
      }

      return;
    }

    if (ref.current) {
      if (collapsed) {
        collapseElement(ref.current);
      } else {
        expandElement(ref.current);
      }
    }
  }, [collapsed]);
  const Component = as || "div";
  return <Component ref={ref} {...props} />;
};

export default Collapsible;
