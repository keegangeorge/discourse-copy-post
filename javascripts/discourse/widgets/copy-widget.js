import { iconNode } from "discourse-common/lib/icon-library";
import { createWidget } from "discourse/widgets/widget";
import I18n from "I18n";
import { clipboardCopy } from "discourse/lib/utilities";
import discourseLater from "discourse-common/lib/later";

createWidget("copy-widget", {
  tagName: "button",

  buildClasses() {
    const classes = [
      "widget-button",
      "btn-flat",
      "copy-post",
      "no-text",
      "btn-icon",
    ];
    return classes;
  },

  buildAttributes() {
    return {
      title: I18n.t(themePrefix("title")),
    };
  },

  html() {
    return iconNode("copy");
  },

  click(attrs) {
    const copyButton = attrs.currentTarget.activeElement;
    const rawCooked = this.attrs.attrs.cooked;
    const cookedText = this.attrs.attrs.cooked.replace(/<p>(.*)<\/p>/g, "$1\n");
    let postContents = cookedText.replace(/(<([^>]+)>)/gi, "");

    if (settings.copy_raw_html) {
      postContents = rawCooked;
    }

    const state = copyButton.innerHTML;

    if (postContents) {
      return clipboardCopy(postContents).then(() => {
        copyButton.classList.add("copied");
        copyButton.innerHTML = I18n.t(themePrefix("copied"));
        discourseLater(() => {
          copyButton.classList.remove("copied");
          copyButton.innerHTML = state;
        }, 3000);
      });
    } else {
      copyButton.innerHTML = "No text to copy";
      discourseLater(() => {
        copyButton.innerHTML = state;
      }, 3000);
    }
  },
});
