import { apiInitializer } from 'discourse/lib/api';

export default apiInitializer('0.11.1', (api) => {
  api.decorateWidget('post-menu:before-extra-controls', (helper) => {
    const results = [];
    results.push(helper.widget.attach('copy-widget', helper));
    return results;
  });
});
