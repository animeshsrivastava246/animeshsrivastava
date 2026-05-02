import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { basicDetails } from './data/basic';
import { skillCategories } from './data/skills';
import { experiences } from './data/experience';

export function proxy(request: NextRequest) {
  const acceptHeader = request.headers.get('accept');
  const { searchParams } = new URL(request.url);
  const isMarkdownRequest = acceptHeader?.includes('text/markdown') || searchParams.get('format') === 'markdown' || request.nextUrl.pathname === '/llms.txt';

  if (isMarkdownRequest) {
    const projectsSummary = [
      {
        title: "Name The Game",
        description: "Find out what is stuck in your head through a gamer community!",
        tech: ["Next.js", "MaterialUI"]
      },
      {
        title: "Storyteller",
        description: "An AI-powered mobile app that turns a single sentence into a fully illustrated short story.",
        tech: ["React Native", "Expo", "Gemini AI"]
      },
      {
        title: "DisneyUI Clone",
        description: "A pixel-perfect, highly animated replica of the Disney+ interface built to run natively in standard browsers.",
        tech: ["React", "Tailwind CSS"]
      }
    ];

    const markdownData = `# ${basicDetails.name} - ${basicDetails.role}

## Summary
${basicDetails.longDescription}

## Contact Information
- **Email:** ${basicDetails.email}
- **Phone:** ${basicDetails.phone}
- **Website:** ${basicDetails.url}
- **Location:** ${basicDetails.location}

## Social Profiles
- **GitHub:** ${basicDetails.socials.github}
- **LinkedIn:** ${basicDetails.socials.linkedin}
- **YouTube:** ${basicDetails.socials.youtube}
- **LeetCode:** ${basicDetails.socials.leetcode}

## Skills
${skillCategories.map(cat => `### ${cat.title}
${cat.skills.map(s => `- ${s.name}${s.level ? ` (${s.level})` : ''}`).join('\n')}
`).join('\n')}

## Professional Experience
${experiences.map(exp => `### ${exp.role} | ${exp.company}
**Period:** ${exp.period}
**Type:** ${exp.type}
${exp.description.map(d => `- ${d}`).join('\n')}
**Key Skills:** ${exp.skills.join(', ')}
`).join('\n')}

## Key Projects
${projectsSummary.map(p => `### ${p.title}
${p.description}
- **Tech Stack:** ${p.tech.join(', ')}
`).join('\n')}

## Education
- **${basicDetails.education.degree}**
  ${basicDetails.education.university} (${basicDetails.education.duration})

## Interests & Learning
- **Learning:** ${basicDetails.learning.join(', ')}
- **Interests:** ${basicDetails.interests.map(i => i.title).join(', ')}

---
*This is a machine-readable version of the website. For the full interactive experience, visit ${basicDetails.url}*
`;

    return new NextResponse(markdownData, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/llms.txt',
    '/:path*'
  ],
};
