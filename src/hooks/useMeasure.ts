import { useState } from "react";
import { LayoutChangeEvent } from "react-native";

export function useMeasure() {
  const [width, setWidth] = useState(0);

  function onLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;

    setWidth(width);
  }

  return {
    width,
    onLayout,
  };
}
