export const helpEmail = 'edwardktwumasi1000@gmail.com';

export const quickServices = [
  {
    id: 'api',
    title: 'API integration',
    promise: 'Make your tools talk.',
    description: 'Connect an external API, wire up a webhook, or fix an integration that keeps breaking.',
    scope: 'Authentication · Data mapping · Retries & error handling',
    proof: 'Explore my backend & product work',
    proofPath: '/projects',
  },
  {
    id: 'deployment',
    title: 'Deployments',
    promise: 'Get your app out into the world.',
    description: 'Take an app from repository to a working domain, or repair a release pipeline that has stalled.',
    scope: 'CI/CD · Containers · HTTPS · Health checks',
    proof: 'See the delivery systems I built',
    proofPath: '/projects',
  },
  {
    id: 'automation',
    title: 'Automations',
    promise: 'Take the repeat work off your plate.',
    description: 'Connect a recurring task across your tools: data syncs, scheduled jobs, alerts, or agent-assisted workflows.',
    scope: 'Webhooks · Scheduled jobs · Tool connections',
    proof: 'Read how GroundControl enables host control',
    proofPath: '/article/nsenter-bridge',
  },
] as const;

export function serviceEmailHref(service: (typeof quickServices)[number], brief: string) {
  const subject = `Quick help — ${service.title}`;
  const body = `Hi Edward,\n\nI’d like help with ${service.title.toLowerCase()}.\n\n${brief.trim() || 'What I’m trying to do:\n\nWhat’s in place / what’s blocked:\n\nPreferred timing:'}\n\nThanks!`;
  return `mailto:${helpEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
