import React from "react";
import DashboardProvider from "../DashboardProvider";

import Expenses from "./Expenses";

const story = {
  title: "Components/Expenses",
  component: Expenses,
};

const Template = (args) => <Expenses {...args} />;

export const PopupVisible = Template.bind({});
PopupVisible.args = {
  popupVisible: true,
  users: [
    {
      displayName: "Adriano",
      uid: 'yfJ2sIUnGrMDQJj5zNuyQ7bcSF62',
      photo:
        "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s320x320/121408914_822708811804216_3787234011134207453_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=OB0OY_6mXYwAX8ye1wC&oh=9849eebb2e9c021ef66bd54f1b83023f&oe=5FC1B18E",
    },
    {
      displayName: "Pjotriano",
      uid: 'yfJ2sIUnGrMDQJj5zNuyQ7bcSF62',
      photo:
        "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s320x320/121408914_822708811804216_3787234011134207453_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=OB0OY_6mXYwAX8ye1wC&oh=9849eebb2e9c021ef66bd54f1b83023f&oe=5FC1B18E",
    }
  ]
};

export const PopupHidden = Template.bind({});
PopupHidden.args = {
  popupVisible: false,
  users: [
    {
      displayName: "Adriano",
      uid: 'yfJ2sIUnGrMDQJj5zNuyQ7bcSF62',
      photo:
        "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s320x320/121408914_822708811804216_3787234011134207453_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=OB0OY_6mXYwAX8ye1wC&oh=9849eebb2e9c021ef66bd54f1b83023f&oe=5FC1B18E",
    },
    {
      displayName: "Pjotriano",
      uid: 'yfJ2sIUnGrMDQJj5zNuyQ7bcSF62',
      photo:
        "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s320x320/121408914_822708811804216_3787234011134207453_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=OB0OY_6mXYwAX8ye1wC&oh=9849eebb2e9c021ef66bd54f1b83023f&oe=5FC1B18E",
    }
  ]
};

export const PopupHiddenHistoryOpen = Template.bind({});
PopupHiddenHistoryOpen.args = {
  popupVisible: false,
  users: [
    {
      displayName: "Adriano",
      uid: 'yfJ2sIUnGrMDQJj5zNuyQ7bcSF62',
      photo:
        "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s320x320/121408914_822708811804216_3787234011134207453_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=OB0OY_6mXYwAX8ye1wC&oh=9849eebb2e9c021ef66bd54f1b83023f&oe=5FC1B18E",
    },
    {
      displayName: "Pjotriano",
      uid: 'yfJ2sIUnGrMDQJj5zNuyQ7bcSF62',
      photo:
        "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s320x320/121408914_822708811804216_3787234011134207453_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=OB0OY_6mXYwAX8ye1wC&oh=9849eebb2e9c021ef66bd54f1b83023f&oe=5FC1B18E",
    }
  ],
  activeSection: 'history',
  historyOf: {
    displayName: "Pjotriano",
    uid: 'yfJ2sIUnGrMDQJj5zNuyQ7bcSF62',
    photo:
      "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s320x320/121408914_822708811804216_3787234011134207453_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=OB0OY_6mXYwAX8ye1wC&oh=9849eebb2e9c021ef66bd54f1b83023f&oe=5FC1B18E",
  }
};

export default story