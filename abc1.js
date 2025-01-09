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
  // Ask user which method to use
  const useBlob = confirm("Would you like to open using blob: instead of about:blank?");

  if (useBlob) {
    // Open using blob: URL
    const blobContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${localStorage.getItem("name") || "My Drive - Google Drive"}</title>
        <link rel="icon" href="${localStorage.getItem("icon") || "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png"}">
      </head>
      <body style="margin:0;">
        <iframe src="main.html" style="position:fixed; top:0; left:0; width:100%; height:100%; border:none;"></iframe>
        <script>
          window.onbeforeunload = function (event) {
            const confirmationMessage = 'Leave Site?';
            (event || window.event).returnValue = confirmationMessage;
            return confirmationMessage;
          };
        </script>
      </body>
      </html>
    `;
    const blob = new Blob([`<iframe src="main.html" style="position:fixed; top:0; left:0; width:100%; height:100%; border:none;"></iframe>`], { type: "text/html" });
    const blobUrl = URL.createObjectURL(blob);

    // Navigate to blob URL
    window.location.href = blobUrl;
  } else {
    // Open using about:blank
    const popup = window.open("about:blank", "_blank");
    if (!popup || popup.closed) {
      alert("Popup blocked. Please allow popups for this site.");
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
}
