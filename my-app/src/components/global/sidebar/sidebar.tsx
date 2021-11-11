import { useCreateList } from "./list-for-sidebar"
import { NavRoom } from "./nav-room";
import { NavTop } from "./nav-top";

export const Sidebar = () => {
    const roomIds = useCreateList();
    return (
        <>
            <ul>
                <NavTop></NavTop>
                {roomIds && roomIds.map((roomId) => {
                    return <NavRoom roomId={roomId}></NavRoom>
                })}

            </ul>

        </>
    )
}