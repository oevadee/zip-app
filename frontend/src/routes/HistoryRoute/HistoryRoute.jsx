import React, { useEffect, useState } from "react";
import "./HistoryRoute.scss";
import { PropTypes } from "prop-types";

// Components
import { useParams } from "react-router";
import { Header } from "../../components";

import { Trash2 as TrashIcon, Clock as ClockIcon } from "react-feather";
import useSWR from "swr";
import {
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "../../uiComponents/Card/Card";
import config from "../../config";

const HistoryRoute = ({ user }) => {
  const [history, setHistory] = useState([]);

  const { id } = useParams();
  const { data, mutate } = useSWR(
    `/api/expenses/history/${id}?userId=${user.id}`
  );

  console.log(history);

  useEffect(() => {
    if (data) {
      const { inHistory, outHistory } = data;
      const sortedHistory = inHistory
        .concat(outHistory)
        .sort((a, b) => b.id - a.id);

      setHistory(sortedHistory);
    }
  }, [data]);

  const handleExpenseDelete = async (expenseId) => {
    try {
      await axios.post(`/api/expenses/delete-request`, {
        expenseId,
        user: user.id,
      });
      await mutate();
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <Spinner color="pink" />;

  return (
    <div className="history">
      <Header title="History" goBackButton />
      <Card>
        <Table size="lg" colorScheme="blue">
          <Thead>
            <Tr>
              <Th w={50}>User</Th>
              <Th w={150} isNumeric>
                Expense
              </Th>
              <Th>Time</Th>
              <Th>About</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {history.map((el) => (
              <Tr key={el.id}>
                <Td w={50}>
                  <Avatar src={el.photo} />
                </Td>
                <Td w={150} isNumeric>
                  {el.value}
                </Td>
                <Td>{el.timestamp}</Td>
                <Td>{el.details}</Td>
                <Td>
                  {el.deletion_requested ? (
                    <Tooltip label={`Pending for approval`} placement="left">
                      <ClockIcon />
                    </Tooltip>
                  ) : (
                    <TrashIcon
                      size={20}
                      color="#e84545"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleExpenseDelete(el.id)}
                    />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
    </div>
  );
};

HistoryRoute.propTypes = {
  historyEl: PropTypes.object,
  historyOf: PropTypes.object,
};

export default HistoryRoute;
