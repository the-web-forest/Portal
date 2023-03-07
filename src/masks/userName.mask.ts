const userNameMask = (name: string): string => {
  return name.replace(/[^a-zA-Zà-ùÀ-Ù ]/g, '');
};

export default userNameMask;
