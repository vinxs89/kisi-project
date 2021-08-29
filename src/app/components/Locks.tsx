import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Lock } from "../Types"
import { LockRow } from "./LockRow";

type LocksProps = {
    locks: Lock[];
}

export const Locks = ({ locks }: LocksProps) => {
    let content;
    if (locks.length === 0) {
        content = 'No locks created';
    } else {
        content = (
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Unlock</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            locks.map(lock => <LockRow key={lock.id} lock={lock} />)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <Box>
            {content}
        </Box>
    )
}