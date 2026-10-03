interface LenisInstance {
  scrollTo: (
    target: string | HTMLElement | number,
    options?: {
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
    }
  ) => void;
  destroy: () => void;
  raf: (time: number) => void;
  stop: () => void;
  start: () => void;
}

interface Window {
  lenis?: LenisInstance;
}
