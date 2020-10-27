import React from 'react';

import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const Expenses = Template.bind({});
Expenses.args = {
  activeSection: 'expenses',  
};

export const Chat = Template.bind({});
Chat.args = {
  activeSection: 'chat',
};

export const History = Template.bind({});
History.args = {
  activeSection: 'history',
};
