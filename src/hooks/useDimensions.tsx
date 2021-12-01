import React from "react";

const useDimensions = () => {
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  const [height, setHeight] = React.useState<number>(window.innerHeight);

  React.useEffect(() => {
    window.onresize = (event: UIEvent) => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
  }, []);

  return { width, height };
};

export { useDimensions };
