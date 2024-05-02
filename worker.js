browser.commands.onCommand.addListener((command) => {
  if (command === "open-adjacent-new-tab") {
    browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
      let index = tabs[0].index;
      browser.tabs.create({ index: index + 1 });
    });
  }
});
