import React from "react";
import DashboardProvider from "../DashboardProvider";

import Chat from "./Chat";

const story = {
  title: "Components/Chat",
  component: Chat,
  decorators: [
    (Story) => (
      <DashboardProvider>
        <Story />
      </DashboardProvider>
    ),
  ],
};

const Template = (args) => <Chat {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  channelName: "PFD",
  channelId: "xxiO3R5c7TbsnEXvMnml",
};

export default story;
