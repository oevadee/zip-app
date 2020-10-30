import React from 'react';

import { addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { themes } from '@storybook/theming';

const channelId = 'xxiO3R5c7TbsnEXvMnml';
const channelName = 'PFD';
const user = {
  displayName: 'Adriano',
  uid: 710222420222,
  photo: 'https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s320x320/121408914_822708811804216_3787234011134207453_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=OB0OY_6mXYwAX8ye1wC&oh=9849eebb2e9c021ef66bd54f1b83023f&oe=5FC1B18E',
}

export const decorators = [(Story) => <Story channelId={channelId} user={user} channelName={channelName} />];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "darkie",
    values: [
      {
        name: "darkie",
        value: "#121212",
      },
      {
        name: "whitie",
        value: "#fff",
      },
    ],
  },
  layout: "fullscreen",
};

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  docs: {
    theme: themes.dark,
  },
});


