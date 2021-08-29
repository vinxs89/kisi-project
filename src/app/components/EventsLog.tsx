import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core"
import { Event } from "../Types";

type EventsLogProps = {
    events: Event[];
}

export const EventsLog = ({ events }: EventsLogProps) => {
    return (
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
                                <TableCell>{new Date(event.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{event.action}</TableCell>
                                <TableCell>{event.objectName}</TableCell>
                                <TableCell>{'' + event.success}</TableCell>
                                <TableCell>{event.message}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}