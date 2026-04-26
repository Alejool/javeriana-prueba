import type React from 'react';

/**
 * Helper to handle clicks on the modal backdrop,
 * closing the modal only if the backdrop itself was clicked (and not its children).
 */
export const handleBackdropClick = (
  e: React.MouseEvent<HTMLDivElement>,
  onClose: () => void
) => {
  if (e.target === e.currentTarget) {
    onClose();
  }
};