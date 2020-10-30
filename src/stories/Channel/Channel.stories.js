import React from "react";

import Channel from "./Channel";

const story = {
  title: "Components/Channel",
  component: Channel,
};

const Template = (args) => <Channel {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: '420710222710',
  channelName: 'PFD'
};

export default story