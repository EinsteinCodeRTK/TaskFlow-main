import "./_team.scss"

import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import Table from "../../components/Table/Table";
import Empty from "../../components/Empty/Empty";
import CreateGroupModal from "../../components/CreateGroupModal/CreateGroupModal";
import EditGroupModal from "../../components/EditGroupModal/EditGroupModal";
import EditMemberModal from '../../components/EditMemberModal/EditMemberModal';
import GroupMemberModal from "../../components/GroupMemberModal/GroupMemberModal";
import { useAuth } from "../../contexts/AuthContext";
import { getGroups, getMembers, deleteGroup, deleteMember } from "../../firebase";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { ReactComponent as AddIcon } from "../../assets/add.svg";
import { Member, Group, TableStructure } from "../../types";
import Button from "../../components/Button/Button";

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    pageTab: number
}

const Team: React.FC<Props> = ({ open, setOpen, pageTab }) => {
    const { currentUser } = useAuth();
    const [groups, setGroups] = useState<Group[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const [showEditGroupModal, setShowEditGroupModal] = useState(false);
    const [showEditMemberModal, setShowEditMemberModal] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    const fetchGroups = async () => {
        if (!currentUser) return;
        
        try {
            setLoading(true);
            const fetchedGroups = await getGroups(currentUser.email);
            setGroups(fetchedGroups.map(group => ({
                id: group.id,
                name: group.name,
                members: group.members,
                createdBy: group.createdBy,
                createdAt: group.createdAt,
                memberCount: group.members.length
            })));
        } catch (error) {
            console.error("Error fetching groups:", error);
            setError("Failed to fetch groups");
        } finally {
            setLoading(false);
        }
    };

    const fetchMembers = async () => {
        if (!currentUser) return;
        
        try {
            const fetchedMembers = await getMembers();
            // Filtrējam, lai rādītu tikai tos lietotājus, kas ir grupās
            const membersInGroups = fetchedMembers.filter(member => 
                groups.some(group => group.members.includes(member.email))
            );
            setMembers(membersInGroups);
        } catch (err) {
            console.error('Error fetching members:', err);
            setError('Neizdevās ielādēt dalībniekus');
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            if (pageTab === 0) {
                await fetchGroups(); // Vispirms iegūstam grupas
                await fetchMembers(); // Tad iegūstam dalībniekus
            } else {
                await fetchGroups();
            }
            setLoading(false);
        };

        loadData();
    }, [currentUser, pageTab]);

    const handleDeleteGroup = async (groupId: string) => {
        try {
            await deleteGroup(groupId);
            await fetchGroups();
            await fetchMembers(); // Atjaunojam arī dalībnieku sarakstu
        } catch (err) {
            console.error('Error deleting group:', err);
            setError('Neizdevās dzēst grupu');
        }
    };

    const handleDeleteMember = async (memberId: string) => {
        try {
            await deleteMember(memberId);
            await fetchMembers();
        } catch (err) {
            console.error('Error deleting member:', err);
            setError('Neizdevās dzēst dalībnieku');
        }
    };

    const handleEditGroup = (groupId: string) => {
        const group = groups.find(g => g.id === groupId);
        if (group) {
            setSelectedGroup(group);
            setShowEditGroupModal(true);
        }
    };

    const handleAddMember = (groupId: string) => {
        const group = groups.find(g => g.id === groupId);
        if (group) {
            setSelectedGroup(group);
            setShowAddMemberModal(true);
        }
    };

    const handleEditMember = (memberId: string) => {
        const member = members.find(m => m.id === memberId);
        if (member) {
            setSelectedMember(member);
            setShowEditMemberModal(true);
        }
    };

    const handleMemberUpdated = () => {
        fetchMembers();
    };

    const groupsStructure: TableStructure = {
        type: "Groups",
        head: ["Name", "Members", "Created At", "Actions"],
        body: groups.map(group => ({
            img: "",
            name: group.name,
            members: group.members.length,
            created: new Date(group.createdAt.seconds * 1000).toLocaleDateString(),
            actions: (
                <div className="group-actions">
                    <button
                        className="icon-button add"
                        onClick={() => handleAddMember(group.id)}
                        title="Pievienot dalībnieku"
                    >
                        <AddIcon />
                    </button>
                    <button
                        className="icon-button edit"
                        onClick={() => handleEditGroup(group.id)}
                        title="Rediģēt grupu"
                    >
                        <EditIcon />
                    </button>
                    <button
                        className="icon-button delete"
                        onClick={() => handleDeleteGroup(group.id)}
                        title="Dzēst grupu"
                    >
                        <DeleteIcon />
                    </button>
                </div>
            ),
            id: group.id
        }))
    };

    const membersStructure: TableStructure = {
        type: "Members",
        head: ["Name", "Email", "Role", "Groups", "Actions"],
        body: members.map(member => ({
            img: "",
            name: member.displayName,
            email: member.email,
            role: member.role,
            groups: member.groups.length,
            actions: (
                <div className="member-actions">
                    <button
                        className="icon-button edit"
                        onClick={() => handleEditMember(member.id)}
                        title="Rediģēt dalībnieku"
                    >
                        <EditIcon />
                    </button>
                    <button
                        className="icon-button delete"
                        onClick={() => handleDeleteMember(member.id)}
                        title="Dzēst dalībnieku"
                    >
                        <DeleteIcon />
                    </button>
                </div>
            ),
            id: member.id
        }))
    };

    if (loading) {
        return <div>Ielādē...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="team-container">
            {pageTab === 0 ? (
                <>
                    {members.length === 0 ? (
                        <Empty message="Nav pievienotu dalībnieku" />
                    ) : (
                        <Table 
                            structure={membersStructure} 
                            open={open} 
                            setOpen={setOpen}
                        />
                    )}
                </>
            ) : (
                <>
                    {groups.length === 0 ? (
                        <Empty message="Nav izveidotu grupu" />
                    ) : (
                        <Table 
                            structure={groupsStructure} 
                            open={open} 
                            setOpen={setOpen}
                        />
                    )}
                </>
            )}
            
            {selectedGroup && (
                <GroupMemberModal
                    open={showAddMemberModal}
                    setOpen={setShowAddMemberModal}
                    groupId={selectedGroup.id}
                    currentMembers={selectedGroup.members}
                    onMemberAdded={() => {
                        fetchGroups();
                        fetchMembers();
                    }}
                />
            )}
            
            {selectedMember && (
                <EditMemberModal
                    open={showEditMemberModal}
                    setOpen={setShowEditMemberModal}
                    member={selectedMember}
                    onMemberUpdated={handleMemberUpdated}
                />
            )}
            
            {selectedGroup && (
                <EditGroupModal
                    open={showEditGroupModal}
                    setOpen={setShowEditGroupModal}
                    group={selectedGroup}
                    onGroupUpdated={fetchGroups}
                />
            )}
        </div>
    );
};

export default Team;