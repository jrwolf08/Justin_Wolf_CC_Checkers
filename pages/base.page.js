const { test, expect } = require("@playwright/test");

exports.BasePage = class BasePage {
  constructor(page) {
    this.page = page;
    this.resetButton = page.getByText("Restart...");
    this.header = page.locator(".page > h1");
    this.board = page.locator("#board");
    this.message = page.locator("#message");
  }

  async resetBoard() {
    await this.resetButton.click();
  }

  //Used soft assertions because I didn't want this to stop program flow.
  async assertFreshPage() {
    await expect.soft(await this.header).toBeVisible();
    await expect.soft(await this.board).toBeEnabled();
    console.log("basepage message:", await this.message.innerText());
    /*await expect
      .soft(await this.message)
      .toEqual("Select an orange piece to move.", { timeout: 5000 });*/
    await expect.soft(await this.resetButton).toBeEnabled();
  }

  //TODO: Make this an assertion instead of a wait step to test Message functionality.
  async waitForMessage(messageText) {
    console.log("waitForText: ", await this.message.innerText());
    await this.page.waitForSelector(
      "#message:has-text('" + messageText + "')",
      {
        timeout: 5000,
      }
    );
  }
};
