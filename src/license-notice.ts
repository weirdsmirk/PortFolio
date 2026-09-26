export function initLicenseNotice() {
  // The source code of this site is MIT licensed, so reading, copying, and forking
  // it is welcome. The design, branding, and written content are not, so this is
  // the one notice that matters.
  const noticeTitle =
    "%c This site is MIT licensed. ";
  const noticeStyle =
    "color: white; background: #171717; font-size: 1.4rem; font-weight: bold; font-family: sans-serif; padding: 10px 14px; border-radius: 5px;";

  const noticeBody = `
The source code behind this portfolio is open source under the MIT License.
Fork it, read it, build your own version, or use it commercially.

What is NOT open source: the design work, branding, graphics, and written
content on this site. Those remain the property of Armaan Verma and may not be
reproduced or redistributed. See the LICENSE file in the repository for details.

If something here helped you, a star or a link back is plenty of thanks.
  `;
  const bodyStyle =
    "color: #525252; font-size: 1rem; font-family: sans-serif; line-height: 1.6;";

  console.log(noticeTitle, noticeStyle);
  console.log(noticeBody, bodyStyle);
}
