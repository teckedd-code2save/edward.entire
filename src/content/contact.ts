import { helpEmail } from './quick-help';

export const contactTopics = [
  { id: 'project', label: 'A project', subject: 'Let’s build something', hint: 'What should it do, what is already in place, and what needs an owner?', outline: 'The idea or problem:\n\nWhat is already in place:\n\nTiming and scope:' },
  { id: 'role', label: 'A role', subject: 'A role to discuss', hint: 'Tell me about the team, the role, and the problem you want this person to own.', outline: 'The team and role:\n\nThe problem to own:\n\nLocation or remote setup:\n\nRole link:' },
  { id: 'research', label: 'Research', subject: 'A research conversation', hint: 'Share the question, the work you have so far, and where we could collaborate.', outline: 'The research question:\n\nRelated work or links:\n\nThe collaboration I have in mind:' },
] as const;

export function contactEmailHref(topic: typeof contactTopics[number], brief: string) {
  const body = `Hi Edward,\n\n${brief.trim() || topic.outline}\n\nThanks!`;
  return `mailto:${helpEmail}?subject=${encodeURIComponent(topic.subject)}&body=${encodeURIComponent(body)}`;
}
