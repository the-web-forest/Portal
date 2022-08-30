const ApiURI = {
  User: {
    index: '/User',
    login: {
      index: '/User/Login',
      google: '/User/Login/Google',
    },
    passwordChange: '/User/Password/Change',
    resetPassword: '/Email/Send/PasswordReset',
    verifyEmail: '/Email/Check',
    sendValidationEmail: 'Email/Send/Validation',
    validateEmail: 'Email/Validate',
  },
  States: '/States',
  Cities: '/Cities',
  Plant: '/Plant',
  Trees: {
    index: '/Tree',
    biomes: {
      active: '/Tree/Biomes/Active',
    },
  },
};

export default ApiURI;
