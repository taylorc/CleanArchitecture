// import { AppPage } from './app.po';

// describe('App', () => {
//   let page: AppPage;

//   beforeEach(() => {
//     page = new AppPage();
//   });

//   it('should display welcome message', () => {
//     page.navigateTo();
//     expect(page.getMainHeading()).toEqual('Hello, world!');
//   });
// });

import { chromium, Browser, Page } from 'playwright';

describe('Angular app homepage', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false, slowMo: 100  });
    page = await browser.newPage();
  });

  it('Should display the correct page title', async () => {
    await page.goto('http://localhost:4200');
    // page.
    expect(await page.innerText("h1")).toBe('Hello, world!');
  });

  afterAll(async () => {
    await browser.close();
  });
});
