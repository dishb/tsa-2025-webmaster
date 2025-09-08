import { useState, useEffect } from "react";

import CountUp, { CountUpProps } from "react-countup";
import { useInView } from "react-intersection-observer";

export const WrappedCountUp: React.FC<CountUpProps> = ({ ...props }) => {
  const [startValue, setStartValue] = useState<number>();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // only re-ready when the focus change [inView]
  useEffect(() => {
    if (inView) {
      setStartValue(0);
    } else {
      setStartValue(undefined);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <CountUp start={startValue} redraw {...props} />
    </div>
  );
};
