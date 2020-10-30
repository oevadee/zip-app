import React from "react";

import Dashboard from "./Dashboard";

const story = {
  title: "Components/Dashboard",
  component: Dashboard,
};

const Template = (args) => <Dashboard {...args} />;

export const Chat = Template.bind({});
Chat.args = {
  activeSection: 'chat'
};

export const Expenses = Template.bind({});
Expenses.args = {
  activeSection: 'expenses'
};

export default story;
