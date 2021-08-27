import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core"
import { Event } from "../Types";

type EventsLogProps = {
    events: Event[] | null | 'Loading';
}

export const EventsLog = ({ events }: EventsLogProps) => {

    let content;
    if (events === null) {
        content = <p>Select a place</p>;
    } else if (events === 'Loading') {
        content = <p>Loading...</p>;
    } else {
        content = (
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Lock</TableCell>
                            <TableCell>Success</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>{event.createdAt}</TableCell>
                                    <TableCell>{event.action}</TableCell>
                                    <TableCell>{event.objectName}</TableCell>
                                    <TableCell>{'' +event.success}</TableCell>
                                    <TableCell>{event.message}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    
    return content;
}