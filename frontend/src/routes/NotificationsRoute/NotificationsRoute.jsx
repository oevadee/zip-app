import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  typography,
} from "@chakra-ui/react";
import Card from "../../uiComponents/Card/Card";
import CardContent from "../../uiComponents/CardContent/CardContent";
import { Header } from "../../components";
import useSWR from "swr";
import {
  Check as CheckIcon,
  HelpCircle as HelpCircleIcon,
} from "react-feather";
import axios from "axios";

const NotificationsRoute = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const { data, error, mutate } = useSWR(
    `/api/expenses/notifications?userId=${user.id}`
  );

  useEffect(() => {
    if (data) {
      setNotifications(data);
    }
  }, [data]);

  const handleAcceptDeletion = async (notificationId) => {
    await axios.delete(
      `/api/expenses/accept-request?notificationId=${notificationId}`
    );
    mutate();
  };

  return (
    <Box p={5} w="100%">
      <Header title="Notifications" />
      <Card>
        {!data || (error && <Spinner color="pink" />)}
        {notifications.length ? (
          <Table>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>User</Th>
                <Th>id</Th>
                <Th>timetamp</Th>
                <Th>value</Th>
                <Th>details</Th>
                <Th>
                  <Box d="flex" justifyContent="center">
                    Confirm
                  </Box>
                </Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {notifications.map((el) => (
                <Tr>
                  <Td>
                    <Avatar src={el.photo}></Avatar>
                  </Td>
                  <Td>{el.name}</Td>
                  <Td>{el.id}</Td>
                  <Td>{el.timestamp}</Td>
                  <Td>{el.value}</Td>
                  <Td>{el.details}</Td>
                  <Td>
                    <Box d="flex" justifyContent="center">
                      <Box _hover={{ color: "green" }}>
                        <CheckIcon
                          cursor="pointer"
                          onClick={() => handleAcceptDeletion(el.id)}
                        />
                      </Box>
                    </Box>
                  </Td>
                  <Td p={(0, 5)}>
                    <HelpCircleIcon cursor="pointer" />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <CardContent>
            <Text variant="">Nobody requested a deletion.</Text>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default NotificationsRoute;
