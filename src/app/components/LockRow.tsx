import { TableRow, TableCell, Button } from "@material-ui/core"
import { useState } from "react"
import Kisi from "../KisiWrapper"
import { Lock } from "../Types"

type LockRowProps = {
  lock: Lock;
}

export const LockRow = ({ lock }: LockRowProps) => {
  const [status, updateStatus] = useState(lock.unlocked ? 'Unlocked' : 'Locked');

  const onUnlock = async (lock: Lock) => {
    updateStatus('In progress');
    try {
      await Kisi.unlock(lock.id);
      updateStatus('Unlocked');
    } catch(e) {
      updateStatus('Failed');
    }
  }

  return (
    <TableRow >
        <TableCell>{lock.name}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell><Button onClick={() => onUnlock(lock)}>Unlock</Button></TableCell>
    </TableRow>
  )
}