import { later } from '@ember/runloop';
import { iconNode } from 'discourse-common/lib/icon-library';
import { createWidget } from 'discourse/widgets/widget';
import I18n from 'I18n';
import { clipboardCopy } from "discourse/lib/utilities";

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
    const rawCooked = this.attrs.attrs.cooked;
    const cookedText = this.attrs.attrs.cooked.replace(/<p>(.*)<\/p>/g, '$1\n');
    let postContents = cookedText.replace(/(<([^>]+)>)/gi, '');

    if (settings.copy_raw_html) {
      postContents = rawCooked;
    }

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
    } else {
      copyButton.innerHTML = 'No text to copy';
      later(() => {
        copyButton.innerHTML = state;
      }, 3000);
    }
  },
});
