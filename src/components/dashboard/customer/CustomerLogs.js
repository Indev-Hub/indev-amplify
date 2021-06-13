import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import axios from '../../../lib/axios';
import Label from '../../Label';
import MoreMenu from '../../MoreMenu';
import Scrollbar from '../../Scrollbar';

const CustomerLogs = (props) => {
  const isMountedRef = useIsMountedRef();
  const [logs, setLogs] = useState([]);

  const getLogs = useCallback(async () => {
    try {
      const response = await axios.get('/api/customers/1/logs');

      if (isMountedRef.current) {
        setLogs(response.data.logs);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getLogs();
  }, [getLogs]);

  return (
    <Card {...props}>
      <CardHeader
        action={<MoreMenu />}
        title="Logs"
      />
      <Divider />
      <Scrollbar>
        <Box sx={{ minWidth: 1150 }}>
          <Table>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell width="100">
                    <Typography
                      color="textPrimary"
                      variant="subtitle2"
                    >
                      {log.method}
                    </Typography>
                  </TableCell>
                  <TableCell width="64">
                    <Label
                      color={log.status === 200
                        ? 'success'
                        : 'error'}
                    >
                      {log.status}
                    </Label>
                  </TableCell>
                  <TableCell>
                    {log.route}
                  </TableCell>
                  <TableCell>
                    {log.description}
                  </TableCell>
                  <TableCell align="right">
                    {log.ip}
                  </TableCell>
                  <TableCell align="right">
                    {format(log.createdAt, 'yyyy/MM/dd | HH:mm:ss')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

export default CustomerLogs;
