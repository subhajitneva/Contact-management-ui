import { newSpecPage } from '@stencil/core/testing';
import { ContactUi } from '../contact-ui';

describe('contact-ui', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ContactUi],
      html: `<contact-ui></contact-ui>`,
    });
    expect(page.root).toEqualHtml(`
      <contact-ui>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </contact-ui>
    `);
  });
});
