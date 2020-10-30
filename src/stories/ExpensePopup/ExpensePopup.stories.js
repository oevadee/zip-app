import React from "react";

import ExpensePopup from "./ExpensePopup";

const story = {
  title: "Components/ExpensePopup",
  component: ExpensePopup,
};

const Template = (args) => <ExpensePopup {...args} />;

export const PopupVisible = Template.bind({});
PopupVisible.args = {
  users: [
    {
      displayName: "Adriano",
      uid: 710222420222,
      photo:
        "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s320x320/121408914_822708811804216_3787234011134207453_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=OB0OY_6mXYwAX8ye1wC&oh=9849eebb2e9c021ef66bd54f1b83023f&oe=5FC1B18E",
    },
    {
      displayName: "Pjotriano",
      uid: 3231114828,
      photo:
        "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s320x320/121408914_822708811804216_3787234011134207453_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=OB0OY_6mXYwAX8ye1wC&oh=9849eebb2e9c021ef66bd54f1b83023f&oe=5FC1B18E",
    },
    {
      displayName: "Carliano",
      uid: 549292111473,
      photo:
        "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s320x320/121408914_822708811804216_3787234011134207453_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=OB0OY_6mXYwAX8ye1wC&oh=9849eebb2e9c021ef66bd54f1b83023f&oe=5FC1B18E",
    },
  ]
};

export default story