import { useEffect } from 'react';

export function useMuteKnownPreviewErrors(errorsToMute: string[]) {
  useEffect(() => {
    const muteErrorIfNeeded = (e: ErrorEvent) => {
      const isErrorToMute = errorsToMute.some((errorToMute) =>
        e.message.includes(errorToMute),
      );
      if (isErrorToMute) {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div',
        );
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay',
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    };

    window.addEventListener('error', muteErrorIfNeeded);
    return () => {
      window.addEventListener('error', muteErrorIfNeeded);
    };
  }, [errorsToMute]);
}
