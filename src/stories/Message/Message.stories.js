import React from "react";

import Message from "./Message";

const story = {
  title: "Components/Message",
  component: Message,
};

const Template = (args) => <Message {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  user: {
    uid: 420777210,
    displayName: "Adi Sz",
    photo:
      "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s320x320/121408914_822708811804216_3787234011134207453_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=OB0OY_6mXYwAX8ye1wC&oh=9849eebb2e9c021ef66bd54f1b83023f&oe=5FC1B18E",
  },
  message: "Elo mordo co tam?",
  timestamp: 'Mon, 26 Oct 2020 17:56:13 GMT'
};

export const LongNameUser = Template.bind({});
LongNameUser.args = {
  user: {
    uid: 420777210,
    displayName: "Adriano Cięlętano",
    photo:
      "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s320x320/121408914_822708811804216_3787234011134207453_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=OB0OY_6mXYwAX8ye1wC&oh=9849eebb2e9c021ef66bd54f1b83023f&oe=5FC1B18E",
  },
  message: "Elo mordo co tam?",
  timestamp: 'Mon, 26 Oct 2020 17:56:13 GMT'
};

export default story