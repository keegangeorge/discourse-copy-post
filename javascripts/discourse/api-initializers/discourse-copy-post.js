import { apiInitializer } from 'discourse/lib/api';

export default apiInitializer('0.11.1', (api) => {
  const user = api.getCurrentUser();
  const trustLevelAllUsers = 5;
  const minTrustLevel = settings.min_trust_level;

  if (minTrustLevel !== trustLevelAllUsers) {
    if (!user) {
      return;
    }

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
