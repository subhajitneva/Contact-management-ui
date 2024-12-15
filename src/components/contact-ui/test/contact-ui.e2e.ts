import { newE2EPage } from '@stencil/core/testing';

describe('contact-ui', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<contact-ui></contact-ui>');

    const element = await page.find('contact-ui');
    expect(element).toHaveClass('hydrated');
  });
});
