import {
  ComponentSpacerSize,
  ComponentTextColor,
  ComponentTextSize,
} from '@team-plain/typescript-sdk';
import UAParser from 'ua-parser-js';

export function customTimelineEntryForBug(bugDescription: string) {
  const parser = new UAParser(window.navigator.userAgent);
  const browser = parser.getBrowser();

  return {
    title: 'Bug report',
    components: [
      {
        componentText: {
          text: bugDescription,
        },
      },
      {
        componentSpacer: {
          spacerSize: ComponentSpacerSize.S,
        },
      },
      {
        componentText: {
          text: `Reported on ${window.location.href} using ${browser.name} (${browser.version})`,
          textSize: ComponentTextSize.S,
          textColor: ComponentTextColor.Muted,
        },
      },
    ],
  };
}

export function customTimelineEntryForFeatureRequest(featureRequest: string) {
  return {
    title: 'Feature request',
    components: [
      {
        componentText: {
          text: featureRequest,
        },
      },
    ],
  };
}

export function customTimelineEntryForQuestion(question: string) {
  return {
    title: 'General question',
    components: [
      {
        componentText: {
          text: question,
        },
      },
    ],
  };
}

export function customTimelineEntryForSecurityReport(securityIssue: string) {
  return {
    title: 'Security report',
    components: [
      {
        componentText: {
          text: securityIssue,
        },
      },
    ],
  };
}

export function customTimelineEntryForDemo(
  demoMessage: string,
  currentProvider: string,
  expectedVolume: string
) {
  return {
    title: 'Demo request',
    components: [
      ...(demoMessage
        ? [
            {
              componentText: {
                text: demoMessage,
              },
            },
            {
              componentSpacer: {
                spacerSize: ComponentSpacerSize.S,
              },
            },
          ]
        : []),
      {
        componentRow: {
          rowMainContent: [
            {
              componentText: {
                text: 'Current provider',
                color: ComponentTextColor.Muted,
              },
            },
          ],
          rowAsideContent: [
            {
              componentText: {
                text: currentProvider,
              },
            },
          ],
        },
      },
      {
        componentRow: {
          rowMainContent: [
            {
              componentText: {
                text: 'Expected volume',
                color: ComponentTextColor.Muted,
              },
            },
          ],
          rowAsideContent: [
            {
              componentText: {
                text: expectedVolume,
              },
            },
          ],
        },
      },
    ],
  };
}
