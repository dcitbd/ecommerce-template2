export function initInstallPrompt() {
  window.addEventListener("beforeinstallprompt", (e) => {
    console.log("PWA Install Prompt ready");
  });
}
