async function openAdjacentNewTab() {
  const [currentTab] = await browser.tabs.query({
    currentWindow: true,
    active: true,
  });
  const index = currentTab.index + 1;

  // Setting the opener makes Firefox return to the current tab when the new
  // tab is closed, like it does for a regular new tab.
  const newTab = await browser.tabs.create({
    index,
    openerTabId: currentTab.id,
  });

  await keepInTabGroup(newTab, currentTab.groupId, index);
}

// A tab created right after the last tab of a group ends up outside of it,
// so it has to be added to the group explicitly.
async function keepInTabGroup(tab, groupId, index) {
  // Tab groups are available since Firefox 138.
  if (!browser.tabs.group || groupId === undefined || groupId === -1) {
    return;
  }
  if (tab.groupId === groupId) {
    return;
  }

  await browser.tabs.group({ tabIds: tab.id, groupId });

  // Grouping may move the tab to the end of the group.
  const groupedTab = await browser.tabs.get(tab.id);
  if (groupedTab.index !== index) {
    await browser.tabs.move(tab.id, { index });
  }
}

browser.commands.onCommand.addListener((command) => {
  if (command === "open-adjacent-new-tab") {
    openAdjacentNewTab();
  }
});

browser.browserAction.onClicked.addListener(openAdjacentNewTab);
