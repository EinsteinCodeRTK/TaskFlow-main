import "./_team.scss"

import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import Table from "../../components/Table/Table";
import Empty from "../../components/Empty/Empty";
import { useAuth } from "../../contexts/AuthContext";
import { getGroups } from "../../firebase";


interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    pageTab: number
}

const Team: React.FC<Props> = ({ open, setOpen, pageTab }) => {
    const { currentUser } = useAuth();
    const [groups, setGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGroups = async () => {
            if (!currentUser) return;
            
            try {
                const fetchedGroups = await getGroups(currentUser.uid);
                setGroups(fetchedGroups);
            } catch (err) {
                console.error('Error fetching groups:', err);
                setError('Neizdevās ielādēt grupas');
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, [currentUser]);

    const structure = {
        type: "Members",
        head: ["", "NAME", "ROLE", "GROUP", "CREATED", "", ""],
        body: [
            {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCcXzKAsVs-YLiCFyVzHUzDz6iHWGWyNIIGg&usqp=CAU",
                name: "Penn Jillette",
                email: "penn.jillette@gmail.com",
                role: "Member",
                group: "Magician",
                created: "21-09-2022 16:35",
                icon_1: "edit",
                icon_2: "delete",
                members: -1,
                date: "Sep 1, 2023",
                plan: "Mid",
                amount: "100.00 €",
                status: true
            }
        ]
    }



    const structureG = {
        type: "Groups",
        head: ["", "NAME", "", "", "MEMBERS", "ACTIONS", "CREATED", "", ""],
        body: groups.map(group => ({
            img: "",
            name: group.name,
            email: "",
            role: "",
            group: "",
            created: new Date(group.createdAt.seconds * 1000).toLocaleDateString('lv-LV'),
            icon_1: "edit",
            icon_2: "delete",
            members: group.members.length,
            date: "Sep 1, 2023",
            plan: "Mid",
            amount: "100.00 €",
            status: true,
            id: group.id,
            memberEmails: group.members
        }))
    }

    if (loading) {
        return <div>Ielādē...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div>


            {pageTab == 0 &&
                <Table open={open} setOpen={setOpen} structure={structure} />
            }

            {pageTab == 1 &&
                <>
                    {groups.length === 0 ? (
                        <Empty 
                            header="Jums nav nevienas grupas" 
                            text="Grupas ļauj organizēt cilvēkus pēc pozīcijas, atrašanās vietas un citiem kritērijiem." 
                        />
                    ) : (
                        <Table open={open} setOpen={setOpen} structure={structureG} />
                    )}
                </>
            }

        </div>
    )
}

export default Team;