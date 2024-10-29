import getCurrentUser from "../actions/getCurrentUser";
import getUsers from "../actions/getUsers";
import SideBar from "../components/Sidebar/SideBar";
import UsersList from "./components/UsersList";

export default async function UsersLayout({children}: {children: React.ReactNode}) {
    const users = await getUsers();
    const currentUser = await getCurrentUser();

    return (
        <SideBar>
            <div className="h-full">
                <UsersList items={users} currentUser={currentUser!} />
                {children}
            </div>
        </SideBar>
    )
}