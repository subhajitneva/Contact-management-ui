import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {
  render() {
    return <div>
        <contact-ui></contact-ui>
    </div>;
  }
}
