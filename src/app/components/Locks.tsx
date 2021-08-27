import { Lock } from "../Types"

type LocksProps = {
    locks: Lock[];
}

export const Locks = ({ locks }: LocksProps) => {
    return (
        <div>
            {
                locks.map(lock => (
                    <div>{lock.name}</div>
                ))
            }
        </div>
    )
}