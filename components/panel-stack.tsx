import { Children, cloneElement, isValidElement, useMemo } from "react";
import { SlidePanel, type SlidePanelProps } from "./slide-panel";

interface PanelStackProps {
  children: React.ReactNode;
}

/**
 * PanelStack automatically manages spacing between SlidePanel components.
 * Each panel's top margin is derived from the previous panel's bottom padding,
 * ensuring perfect overlap of decorations.
 */
export function PanelStack({ children }: PanelStackProps) {
  const transformedChildren = useMemo(() => {
    const childrenArray = Children.toArray(children);

    return childrenArray.map((child, index) => {
      if (
        !isValidElement<SlidePanelProps>(child) ||
        child.type !== SlidePanel
      ) {
        return child;
      }

      // Get previous panel's decoration height
      const previousChild = index > 0 ? childrenArray[index - 1] : null;
      const previousDecorationHeight =
        isValidElement<SlidePanelProps>(previousChild) &&
        previousChild.type === SlidePanel
          ? (previousChild.props.decorationHeight ?? "tall")
          : null;

      return cloneElement(child, {
        ...child.props,
        previousDecorationHeight,
      });
    });
  }, [children]);

  return <>{transformedChildren}</>;
}
