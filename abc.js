let inFrame;

try {
  inFrame = window !== top;
} catch (e) {
  inFrame = true;
}
if (!localStorage.getItem("ab")) localStorage.setItem("ab", true);
if (
  !inFrame &&
  !navigator.userAgent.includes("Firefox") &&
  localStorage.getItem("ab") === "true"
) {
  const popup = open("about:blank", "_blank");
  if (!popup || popup.closed) {
    alert("bro")
  } else {
    const doc = popup.document;
    const iframe = doc.createElement("iframe");
    const style = iframe.style;
    const link = doc.createElement("link");

    const name = localStorage.getItem("name") || "My Drive - Google Drive";
    const icon =
      localStorage.getItem("icon") ||
      "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

    doc.title = name;
    link.rel = "icon";
    link.href = icon;

    iframe.src = "main.html";
    style.position = "fixed";
    style.top = style.bottom = style.left = style.right = 0;
    style.border = style.outline = "none";
    style.width = style.height = "100%";

    doc.head.appendChild(link);
    doc.body.appendChild(iframe);

    const pLink = localStorage.getItem(encodeURI("pLink")) || getRandomUrl();
    location.replace(pLink);

    const script = doc.createElement("script");
    script.textContent = `
      window.onbeforeunload = function (event) {
        const confirmationMessage = 'Leave Site?';
        (event || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      };
    `;
    doc.head.appendChild(script);
  }
}