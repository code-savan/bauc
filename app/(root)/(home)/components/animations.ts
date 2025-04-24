// Animation variants for framer-motion
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 }
};

export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
  transition: { duration: 0.4 }
};

export const slideDown = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
  transition: { duration: 0.4 }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
};

// Loader-specific animations
export const loaderVariants = {
  initial: {
    opacity: 1
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const logoVariants = {
  initial: {
    scale: 0.8,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const progressVariants = {
  initial: {
    width: 0
  },
  animate: (width: number) => ({
    width: `${width}%`,
    transition: {
      duration: 0.2,
      ease: "linear"
    }
  })
};
