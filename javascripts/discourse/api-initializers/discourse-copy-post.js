import { apiInitializer } from 'discourse/lib/api';

export default apiInitializer('0.11.1', (api) => {
  const user = api.getCurrentUser();

  if (settings.min_trust_level !== 'disabled') {
    if (!user) {
      return;
    }

    const minTrustLevel = +settings.min_trust_level;
    if (user.trust_level < minTrustLevel) {
      return;
    }
  }

  api.decorateWidget('post-menu:before-extra-controls', (helper) => {
    const results = [];
    results.push(helper.widget.attach('copy-widget', helper));
    return results;
  });
});
