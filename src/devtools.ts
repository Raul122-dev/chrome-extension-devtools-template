chrome.devtools.panels.create(
  "React Panel",
  "icon32.png",
  "public/panel.html",
  () => console.log("Panel loaded")
);
