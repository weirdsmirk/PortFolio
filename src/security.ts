export function initSecurity() {
  // 1. Massive stern warning in the console
  const warningTitle = "%c STOP! \n UNAUTHORIZED ACCESS PROHIBITED ";
  const warningStyle =
    "color: white; background: red; font-size: 3rem; font-weight: bold; text-align: center; font-family: sans-serif; padding: 20px; border-radius: 5px;";
  
  const warningBody = `
%cThis is a restricted environment.

The design, code, graphics, images, and content of this website are the exclusive intellectual property of Armaan Verma.

• DO NOT attempt to download, extract, copy, or reuse any images or assets.
• Any unauthorized copying, reproduction, or distribution is strictly prohibited and may constitute copyright infringement.
• Violators will be subject to severe legal consequences and financial liabilities.

If you are a recruiter or client, please appreciate the work visually. 
Any attempt to inspect, scrape, or steal assets is logged and monitored.
  `;
  const bodyStyle = "color: #333; font-size: 1.2rem; font-family: sans-serif; line-height: 1.6;";

  console.log(warningTitle, warningStyle);
  console.log(warningBody, bodyStyle);

  // Periodic console clearing & warning to annoy DevTools users
  setInterval(() => {
    console.log("%cUnauthorized extraction is illegal.", "color: red; font-weight: bold; font-size: 20px;");
  }, 5000);

  // 2. Prevent keyboard shortcuts for DevTools and Save As
  window.addEventListener("keydown", (e) => {
    // F12
    if (e.key === "F12") {
      e.preventDefault();
    }
    // Ctrl+Shift+I / Cmd+Opt+I (DevTools)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) {
      e.preventDefault();
    }
    // Ctrl+U / Cmd+Opt+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u")) {
      e.preventDefault();
    }
    // Ctrl+S / Cmd+S (Save As)
    if ((e.ctrlKey || e.metaKey) && (e.key === "S" || e.key === "s")) {
      e.preventDefault();
    }
  });

  // 3. Global Context Menu blocker (prevents right-click -> Inspect)
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // 4. Global drag prevention on images
  window.addEventListener("dragstart", (e) => {
    if ((e.target as HTMLElement).tagName === "IMG") {
      e.preventDefault();
    }
  });
}
