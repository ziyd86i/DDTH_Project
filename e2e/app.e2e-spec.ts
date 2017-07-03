import { DDTHAppPage } from './app.po';

describe('ddth-app App', () => {
  let page: DDTHAppPage;

  beforeEach(() => {
    page = new DDTHAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
