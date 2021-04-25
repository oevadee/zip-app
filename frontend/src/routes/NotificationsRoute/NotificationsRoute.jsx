import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  color,
  Heading,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
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
  X as XIcon,
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

  const handleRejectDeletion = async (notificationId) => {
    await axios.put(
      `/api/expenses/reject-request?notificationId=${notificationId}`
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
                <Th>
                  <Box d="flex" justifyContent="center">
                    Cancel
                  </Box>
                </Th>
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
                        <IconButton
                          aria-label="Search database"
                          variant="solid"
                          colorScheme="green"
                          onClick={() => handleAcceptDeletion(el.id)}
                          icon={<CheckIcon cursor="pointer" />}
                        />
                      </Box>
                    </Box>
                  </Td>
                  <Td>
                    <Box d="flex" justifyContent="center">
                      <Box>
                        <Tooltip
                          label="cancel and request explanation."
                          placement="left"
                        >
                          <IconButton
                            aria-label="Search database"
                            variant="solid"
                            colorScheme="red"
                            onClick={() => handleRejectDeletion(el.id)}
                            icon={
                              <XIcon
                                cursor="pointer"
                                color="white"
                                _hover={{ color: "white" }}
                              />
                            }
                          />
                        </Tooltip>
                      </Box>
                    </Box>
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
