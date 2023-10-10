export function useModal() {
  const showMessageModal = (html) => {
    M.toast({ html });
  };

  const showErrorModal = function (html) {
    M.toast({ html: `Ошибка. ${html}` });
  };

  return { showMessageModal, showErrorModal };
}
