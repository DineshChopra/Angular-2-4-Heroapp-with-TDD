import { HeroappPage } from './app.po';

describe('heroapp App', () => {
  let page: HeroappPage;

  beforeEach(() => {
    page = new HeroappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
