import React from "react";
import { Box, Heading, typography } from "@chakra-ui/react";
import Card from "../../uiComponents/Card/Card";
import CardContent from "../../uiComponents/CardContent/CardContent";
import { Header } from "../../components";

const NotificationsRoute = () => {
  return (
    <Box p={5} w="100%">
      <Header title="Notifications" />
      <Card>
        <CardContent>
          <Heading></Heading>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotificationsRoute;
