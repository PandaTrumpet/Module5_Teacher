export const ctrlWrapper = (contorller) => {
  const func = async (req, res, next) => {
    try {
      await contorller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

// створює обгортку
