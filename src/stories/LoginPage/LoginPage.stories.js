import React from "react";

import LoginPage from "./LoginPage";

const story = {
  title: "Components/LoginPage",
  component: LoginPage,
};

const Template = (args) => <LoginPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};

export default story