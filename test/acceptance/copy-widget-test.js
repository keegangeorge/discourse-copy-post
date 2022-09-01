import { acceptance, exists } from "discourse/tests/helpers/qunit-helpers";
import { click, visit } from "@ember/test-helpers";
import { test } from "qunit";

acceptance("Copy Post", function (needs) {
  needs.user();

  test("Copy post contents", async function (assert) {
    await visit("/t/internationalization-localization/280");
    assert.ok(
      exists("#post_1 .post-controls .copy-post"),
      "copy post button is visible"
    );
    await click("#post_1 .post-controls .copy-post");
    const cookedPost = document.querySelector("#post_1 .cooked").innerText;

    window.navigator.clipboard.readText().then((clippedText) => {
      assert.equal(
        clippedText.replace(/\s+/g, ""),
        cookedPost.replace(/\s+/g, ""),
        "post contents were correctly copied to the clipboard"
      );
    });
  });
});
