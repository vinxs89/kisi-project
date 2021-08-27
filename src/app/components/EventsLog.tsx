import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core"

type EventsLogProps = {
    events: any[];
}

export const EventsLog = ({ events }: EventsLogProps) => {
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Success</TableCell>
                        <TableCell>Message</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {events.map((event) => (
                    <TableRow key={event.id}>
                        <TableCell>{event.createdAt}</TableCell>
                        <TableCell>{event.type}</TableCell>
                        <TableCell>{event.success}</TableCell>
                        <TableCell>{event.message}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        )
}