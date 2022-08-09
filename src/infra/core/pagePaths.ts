const pagePaths = {
  index: '/',
  signup: {
    index: '/cadastro',
    success: '/cadastro/sucesso',
  },
  dashboard: '/dashboard',
  resendPassword: {
    index: '/recuperar-senha',
    success: '/recuperar-senha/sucesso',
  },
  newPassword: {
    index: '/senha/redefinir',
    success: '/senha/redefinir/sucesso',
    expired: '/senha/redefinir/expirado',
  },
  resendEmail: {
    index: '/reenviar-confirmacao',
    success: '/reenviar.confirmacao/sucesso',
  },
};

export default pagePaths;
