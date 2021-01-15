import React from 'react';

import Button from './Button';

const story = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  text: 'Click me',
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  text: 'Log out',
};

export default story
