export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export const scaleOnHover = {
  whilehover: { scale: 1.05 },
  whiletap: { scale: 0.95 },
};
