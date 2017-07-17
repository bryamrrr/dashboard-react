export const SHOW_TOASTER = 'SHOW_TOASTER';
export const HIDE_TOASTER = 'HIDE_TOASTER';

export function showToaster(type, message) {
  const id = new Date().getTime();

  return {
    type: SHOW_TOASTER,
    payload: {
      type,
      message,
      id,
    },
  };
}
