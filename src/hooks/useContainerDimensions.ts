import { useEffect, useState } from 'react';

interface IDimensions {
  width: number;
  height: number;
}

type TRef = React.RefObject<HTMLElement>;

/**
 * Hook to track changes in an HTML element
 */
export const useContainerDimensions = (myRef: TRef | null) => {
  // --->>

  const getDimensions = () => ({
    width: myRef?.current?.offsetWidth || 0,
    height: myRef?.current?.offsetHeight || 0,
  });

  const [dimensions, setDimensions] = useState<IDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef && myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  return dimensions;
};
