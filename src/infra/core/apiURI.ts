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
  Plant: {
    index: '/Plant',
    detail: '/Plant/{plantId}',
    customize: '/Plant/Customize',
  },
  Trees: {
    index: '/Tree',
    biomes: {
      active: '/Tree/Biomes/Active',
    },
  },
  Configuration: {
    index: '/Configuration',
  },
};

export default ApiURI;
