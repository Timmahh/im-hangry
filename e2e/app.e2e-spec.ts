import { ImHangryPage } from './app.po';

describe('im-hangry App', () => {
  let page: ImHangryPage;

  beforeEach(() => {
    page = new ImHangryPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
