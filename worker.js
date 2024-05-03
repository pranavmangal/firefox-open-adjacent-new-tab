function openAdjacentNewTab() {
  browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
    let index = tabs[0].index;
    browser.tabs.create({ index: index + 1 });
  });
}

browser.commands.onCommand.addListener((command) => {
  if (command === "open-adjacent-new-tab") {
    openAdjacentNewTab();
  }
});

browser.browserAction.onClicked.addListener(openAdjacentNewTab);
