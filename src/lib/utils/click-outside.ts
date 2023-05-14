export const clickOutside = (element: HTMLElement, callback: () => void) => {
  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!element.contains(target)) callback();
  };

  document.body.addEventListener('click', onClick);

  return {
    update(newCallbackFunction: () => void) {
      callback = newCallbackFunction;
    },
    destroy() {
      document.body.removeEventListener('click', onClick);
    }
  };
};
