'use client'

import { User } from "@prisma/client"
import UserBox from "./UserBox"
import SettingsModal from "@/app/components/Sidebar/SettingsModal"
import { useState } from "react"
import Avatar from "@/app/components/Avatar"

interface UsersListProps {
    items: User[]
    currentUser:User
}

const UsersList = ({items, currentUser}: UsersListProps) => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <aside className="fixed inset-y-0 pb -20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
        <div className="px-5">
            <div className="flex-col">
                <div className="text-xl font-bold text-neutral-800 py-4">
                    People
                </div>
                <span onClick={() => setIsOpen(true)} className="fixed lg:hidden block top-0 right-0 pt-4 pr-8">
                    <Avatar user={currentUser} />
                    <SettingsModal
                        currentUser={currentUser}
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                    />
                </span>
            </div>
            {items.map((item) => (
                <UserBox key={item.id} data={item} />
            ))}
        </div>
    </aside>
  )
}

export default UsersList