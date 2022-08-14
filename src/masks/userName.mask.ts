const userNameMask = (name: string): string => {
  return name.replace(/[^a-zA-Z ]/g, '');
};

export default userNameMask;
