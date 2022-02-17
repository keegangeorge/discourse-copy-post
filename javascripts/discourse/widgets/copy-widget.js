import { later } from '@ember/runloop';
import { iconNode } from 'discourse-common/lib/icon-library';
import { createWidget } from 'discourse/widgets/widget';
import I18n from 'I18n';
import clipboardCopy from '../lib/clipboard-copy';

createWidget('copy-widget', {
  tagName: 'button',

  buildClasses() {
    const classes = ['widget-button', 'btn-flat', 'no-text', 'btn-icon'];
    return classes;
  },

  html() {
    return iconNode('copy');
  },

  click(attrs) {
    const copyButton = attrs.currentTarget.activeElement;
    const postContents = this.attrs.attrs.cooked.replace(/(<([^>]+)>)/gi, '');
    const state = copyButton.innerHTML;

    if (postContents) {
      return clipboardCopy(postContents).then(() => {
        copyButton.classList.add('copied');
        copyButton.innerHTML = I18n.t(themePrefix('copied'));
        later(() => {
          copyButton.classList.remove('copied');
          copyButton.innerHTML = state;
        }, 3000);
      });
    }
  },
});
