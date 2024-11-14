export const prerender = true;
export const ssr = false;

if ("virtualKeyboard" in navigator) {
  navigator.virtualKeyboard.overlaysContent = true;
}