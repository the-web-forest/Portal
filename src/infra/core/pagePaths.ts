const pagePaths = {
  index: '/',
  signup: {
    index: '/cadastro',
    success: '/cadastro/sucesso',
  },
  dashboard: '/dashboard',
  myAccount: '/minha-conta',
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
  payment: {
    shoppingCart: '/carrinho',
  },
  registerConfirm: {
    index: '/cadastro-confirmacao',
    success: '/cadastro-confirmacao/sucesso',
    expirated: '/cadastro-confirmacao/expirado',
    send: '/cadastro-confirmacao/enviado',
  },
  plant: {
    confirmation: '/confirmacao-plantio',
  },
};

export default pagePaths;
