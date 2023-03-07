const userNameMask = (name: string): string => {
  return name.replace(/[^a-z A-Z à-ù À-Ù]/g, '');
};

export default userNameMask;
