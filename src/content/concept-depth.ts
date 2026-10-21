/**
 * Long-form depth for the concept pages, in one place.
 *
 * Every concept page needs the same four blocks: a worked example, a table
 * that contrasts the failure with the fix, a method note, and sources. Keeping
 * the copy here rather than in six page files means the shape is defined once
 * and a page that is missing a block is missing a key, not a block of JSX.
 */

export interface DepthBlock {
  heading: string;
  paragraphs: string[];
}

export interface DepthTable {
  heading: string;
  intro?: string;
  columns: [string, string];
  rows: Array<{ left: string; right: string }>;
}

export interface DepthSource {
  title: string;
  href: string;
  note: string;
}

export interface ConceptDepth {
  worked?: DepthBlock;
  table?: DepthTable;
  method?: DepthBlock;
  sources: DepthSource[];
}

const AI_INDEX: DepthSource = {
  title: 'AI Index',
  href: 'https://hai.stanford.edu/ai-index',
  note: 'Stanford HAI. The capability and adoption figures behind the numbers on this page.',
};

const NIST_RMF: DepthSource = {
  title: 'AI Risk Management Framework',
  href: 'https://www.nist.gov/itl/ai-risk-management-framework',
  note: 'NIST. Treats governance as named roles and documented responsibility, which is the structural form of the argument here.',
};

const WORKLAB: DepthSource = {
  title: 'Work Trend Index',
  href: 'https://www.microsoft.com/en-us/worklab/work-trend-index',
  note: 'Microsoft. Survey work on how people adopt AI inside organisations, including where the change stalls.',
};

const LOST_MIDDLE: DepthSource = {
  title: 'Lost in the Middle: How Language Models Use Long Contexts',
  href: 'https://arxiv.org/abs/2307.03172',
  note: 'Liu et al., 2023. Models use the start and end of a long input better than the middle.',
};

const SYCOPHANCY: DepthSource = {
  title: 'Towards Understanding Sycophancy in Language Models',
  href: 'https://arxiv.org/abs/2310.13548',
  note: 'Sharma et al., 2023. Models tend to agree with a premise stated in the prompt, so a wrong assumption comes back confirmed.',
};

export const CONCEPT_DEPTH: Record<string, ConceptDepth> = {
  'accountability-gap': {
    worked: {
      heading: 'The summary that landed in an inbox nobody opened',
      paragraphs: [
        'An operations lead at a 90-person distributor installed an agent to summarise support tickets every Friday. The summaries were accurate. They arrived in a shared inbox. By the third week nobody opened them, and the team was back to asking the same three questions in a group chat.',
        'The fix took one line in a job description. A named person, the support lead, had to bring one decision to Monday standup that the summary had changed. A price to adjust, a help article to rewrite, a customer to call. Once the summary had a decision attached, people read it.',
        'The agent never changed. The ownership did. Activity looked identical in both months, which is why the gap stayed invisible on a dashboard.',
      ],
    },
    table: {
      heading: 'Where the gap shows up',
      intro: 'Each symptom reads as a tooling problem. Each cause is an ownership problem.',
      columns: ['Symptom', 'What is missing'],
      rows: [
        { left: 'Reports are accurate and unread', right: 'No decision is attached to the output' },
        { left: 'Usage is high and outcomes are flat', right: 'Nobody can name what should change as a result' },
        { left: 'A pilot wins its demo and stops', right: 'The owner of the result was never named' },
        { left: 'Every team runs its own assistant', right: 'No single place where outputs meet decisions' },
        { left: 'Someone leaves and the workflow dies', right: 'Accountability lived in a person, not a role' },
      ],
    },
    method: {
      heading: 'How I check for it',
      paragraphs: [
        'Three questions do most of the diagnostic. Who reads this output, and on what day. What decision did they make with it last week. Who gets asked why it did not work.',
        'If the first answer is a team rather than a person, the gap is open. Shared ownership reads as ownership in a meeting and as nobody in practice. If the third answer is a vendor, the gap is open too, because the person who can change the process is not the person who owns the result.',
        'I run this before any rebuild. It takes twenty minutes and usually saves a quarter of the work.',
      ],
    },
    sources: [NIST_RMF, AI_INDEX, WORKLAB],
  },

  'human-architect': {
    worked: {
      heading: 'The analyst who was already doing the job',
      paragraphs: [
        'A logistics firm spent two months looking for a Human Architect. The brief described a senior hire with an AI background and budget authority. The role stayed open, and the gap it was meant to close stayed open with it.',
        'The person already doing the work was a senior analyst in operations. She had built the weekly exception report by hand for four years, knew which discrepancies mattered, and was the one who rang the warehouse when the numbers looked wrong. She had no AI in her title.',
        'The appointment took a conversation and a change to her objectives. Her remit became the exceptions the model surfaced and what happened to each one. Within a month she was the reason two recurring errors stopped recurring.',
        'The firm was searching for credentials. It needed someone who already owned the outcome, and that person was two desks away.',
      ],
    },
    table: {
      heading: 'What the role is, and what it is not',
      columns: ['Not this', 'This'],
      rows: [
        { left: 'A new VP hire with an AI title', right: 'An existing operator with cross-functional reach' },
        { left: 'A part-time champion with no authority', right: 'A named owner of one business outcome' },
        { left: 'The person who built the workflow', right: 'The person who judges whether it worked' },
        { left: 'A consultant who reports findings', right: 'An insider who can change the process' },
        { left: 'A custodian of the tool', right: 'A custodian of the result' },
      ],
    },
    method: {
      heading: 'How to test a candidate in one meeting',
      paragraphs: [
        'Ask them to describe a number they do not trust, and what they did about it. Anyone who owns an outcome has one. They will tell you which report lies, who fixes it, and how long it takes.',
        'Then ask what they would stop doing if the model turned out to be right. A real owner names a process they would retire. A tool enthusiast names a tool they would add.',
        'The role is usually filled from inside, which is why the search takes longer than the appointment.',
      ],
    },
    sources: [NIST_RMF, WORKLAB, AI_INDEX],
  },

  'pilot-itis': {
    worked: {
      heading: 'The pilot that won the demo and lost the budget',
      paragraphs: [
        'A professional services firm ran a six-week pilot on proposal drafting. Volunteers joined, the tool was optional, and success meant the draft was faster than the manual version. It was. The demo went well and everyone agreed to continue.',
        'Nothing continued. The volunteers went back to their own templates, the tool lapsed, and eighteen months later a different team ran the same pilot with a different vendor.',
        'The pilot had been designed to prove the tool worked. Nobody had designed the week after it. No process changed, no owner was named, and no manager had a reason to enforce anything once the novelty wore off.',
        'The second attempt at the same firm started from the opposite end. One team, one owner, one process rewritten before the tool arrived, and a number that had to move by a named date. It was less impressive in the demo and it survived contact with a normal quarter.',
      ],
    },
    table: {
      heading: 'Two ways to design the same six weeks',
      columns: ['Pilot design', 'Production design'],
      rows: [
        { left: 'Volunteers opt in', right: 'One team is assigned and one manager owns the result' },
        { left: 'Success means the tool works', right: 'Success means a named number moves by a named date' },
        { left: 'The existing process stays intact', right: 'The process is redesigned before the tool arrives' },
        { left: 'The ending is a decision to continue', right: 'The ending is a handover to the people who keep it running' },
        { left: 'A demo makes the case', right: 'A normal quarter makes the case' },
      ],
    },
    method: {
      heading: 'Three questions before any pilot starts',
      paragraphs: [
        'Who owns the number this is meant to move, and will they be in the room at the end. Which process changes if this works, and who has agreed to that change. What happens on the Monday after the pilot closes.',
        'If the third answer is vague, the pilot is a demo with a longer calendar. The pattern repeats because the demo is genuinely convincing and the week after is genuinely nobody\'s job.',
        'I ask these before the vendor is chosen. They cost less than the pilot.',
      ],
    },
    sources: [AI_INDEX, WORKLAB, NIST_RMF],
  },

  'psychology-led-adoption': {
    worked: {
      heading: 'The training session where everyone agreed',
      paragraphs: [
        'A hospital trust ran four AI workshops. Attendance was high, questions were polite, and the feedback said the sessions were useful. Six weeks later, two of the forty attendees used anything they had learned.',
        'The workshop had taught prompts. The thing stopping people was not knowing how to write one. A senior nurse explained it in one sentence: if she used AI to draft a care note and it was wrong, her registration carried the consequence, not the tool\'s.',
        'That is a fear about accountability, not a skills gap. No amount of prompting practice touches it. What changed behaviour was a written rule about who reviews what, agreed by the clinical lead, and a named person to escalate a bad output to.',
        'The second round of workshops kept the same content and added that rule. Usage held. The training had never been the problem.',
      ],
    },
    table: {
      heading: 'What people say, and what they mean',
      columns: ['What people say', 'What is usually underneath'],
      rows: [
        { left: 'I do not have time to learn this', right: 'If it goes wrong, the cost lands on me' },
        { left: 'It is not accurate enough for our work', right: 'Nobody has defined what accurate means here' },
        { left: 'We tried something like this before', right: 'The last attempt was announced and then abandoned' },
        { left: 'My team prefers the old way', right: 'The old way is what their appraisal measures' },
        { left: 'I will wait until it is ready', right: 'No one has said what ready looks like' },
      ],
    },
    method: {
      heading: 'How I find the real barrier',
      paragraphs: [
        'I ask what would have to be true for them to use this on a real piece of work tomorrow. The answer is almost never about the tool. It is about permission, review, consequence, or time.',
        'Then I ask what happened the last time the organisation tried something new. The answer predicts this rollout better than any survey, because whatever the last change cost people is what they are protecting against now.',
        'Neither question is about technology, which is why a technology-led rollout keeps missing.',
      ],
    },
    sources: [WORKLAB, AI_INDEX],
  },

  'results-thinkers': {
    worked: {
      heading: 'The finance manager who built her own',
      paragraphs: [
        'A finance manager at a manufacturer asked for a tool to reconcile three exports before the monthly close. It was not in the roadmap. She built it herself over two evenings, checked the output against two closed months by hand, and then told her director it existed.',
        'She was not an early adopter. She had never used a chat assistant before that quarter. She had a recurring task, a number she did not trust, and permission to stop doing the manual version.',
        'Her director gave her the one thing the rollout had not: an hour a week and the right to call it official. Two other managers copied the approach within a month, unprompted.',
        'The organisation had spent a year trying to train the 95%. It got further with one person who already had a problem to solve.',
      ],
    },
    table: {
      heading: 'How to tell them apart',
      columns: ['Tool enthusiast', 'Results thinker'],
      rows: [
        { left: 'Asks what the tool can do', right: 'Asks what number needs to move' },
        { left: 'Tries everything that is announced', right: 'Ignores announcements and solves one recurring task' },
        { left: 'Shows you a clever prompt', right: 'Shows you a check against last month' },
        { left: 'Wants a licence for the team', right: 'Wants permission to stop the manual version' },
        { left: 'Stops when the novelty fades', right: 'Keeps going because the task is still there' },
      ],
    },
    method: {
      heading: 'How to find them in a week',
      paragraphs: [
        'Ask managers one question: who already automated something without being asked. The list is short and it is accurate, because nobody builds a workaround for a problem they do not care about.',
        'Then check what happened to that person. In most organisations they were told to stop, or the workaround was absorbed with no recognition. Both answers tell you how the next one will be treated.',
        'The intervention is not training. It is an hour a week, a named task, and the right to make it official.',
      ],
    },
    sources: [WORKLAB, AI_INDEX],
  },

  'the-install-trap': {
    worked: {
      heading: 'The agent that ran for six weeks',
      paragraphs: [
        'A founder installed a work agent in an afternoon. It read email, drafted replies, and filed summaries into a folder. For six weeks it ran every weekday and produced a steady stream of tidy output.',
        'Nobody read the summaries. The drafts were rewritten from scratch, because approving them took as long as writing them. The agent was working, and nothing it produced changed a decision.',
        'The fix was to give it one task with a measurable end. Draft the four supplier follow-ups each Monday, against a list he already maintained by hand, and leave them in drafts. That was all it did for a month. It saved about ninety minutes a week, which was the point.',
        'The first version was more capable and worth less. Installing was never the difficulty, which is why the trap closes quietly after the agent starts running.',
      ],
    },
    table: {
      heading: 'Installed, and working',
      columns: ['Installed', 'Working'],
      rows: [
        { left: 'The agent runs on a schedule', right: 'One named task has an owner and an end' },
        { left: 'Output exists in a folder', right: 'Output is read and acted on by a specific person' },
        { left: 'Success means no errors', right: 'Success means a number or a duration moved' },
        { left: 'The workflow stays as it was', right: 'The manual version is retired' },
        { left: 'Value is assumed', right: 'Value is measured for eight weeks' },
      ],
    },
    method: {
      heading: 'What to define before you install',
      paragraphs: [
        'Four things, on one page. The task, the person who reads the output, what they do differently because of it, and the number that should move. If the fourth is blank, the install is a hobby.',
        'Then decide what gets retired. An agent added to an existing process doubles the work for as long as both versions run, which is the most common reason a working agent gets switched off.',
        'Long instructions make this harder rather than easier. A prompt that lists nine responsibilities gets partly followed, so the task has to be small enough to survive the model\'s attention.',
      ],
    },
    sources: [LOST_MIDDLE, AI_INDEX, WORKLAB],
  },
};

