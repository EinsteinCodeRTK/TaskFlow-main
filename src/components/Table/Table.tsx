import React, { Dispatch, SetStateAction, useState } from 'react'

import Button from '../Button/Button';
import Filter from '../Dropdowns/Filter/Filter';
import GroupMemberModal from '../GroupMemberModal/GroupMemberModal';
import './_table.scss'

interface TableStructure {
    type: string;
    head: string[];
    body: {
        img: string;
        name: string;
        email?: string;
        role?: string;
        group?: string;
        created: string;
        icon_1?: string;
        icon_2?: string;
        members?: number;
        date?: string;
        plan?: string;
        amount?: string;
        status?: boolean;
        id?: string;
        memberEmails?: string[];
        actions?: React.ReactNode;
    }[];
}

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    structure: TableStructure
}

const Table: React.FC<Props> = ({ open, setOpen, structure }) => {
    const [showMemberModal, setShowMemberModal] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState<string>('');
    const [selectedGroupMembers, setSelectedGroupMembers] = useState<string[]>([]);

    const handleAddMember = (groupId: string, currentMembers: string[]) => {
        setSelectedGroupId(groupId);
        setSelectedGroupMembers(currentMembers);
        setShowMemberModal(true);
    };

    return (
        <div className='table'>
            <div className='table-actions'>
                <div className='table-actions-left'>
                    <div className='table-select-all'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 16 16"
                        >
                            <path
                                stroke="#CED4E0"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 14.667h4c3.334 0 4.667-1.333 4.667-4.667V6c0-3.333-1.333-4.667-4.667-4.667H6C2.667 1.333 1.333 2.667 1.333 6v4c0 3.334 1.334 4.667 4.667 4.667z"
                            ></path>
                        </svg>
                        <p>Select all</p>

                    </div>

                    <div>
                        <Button status='' text='Export CSV' normal={false} width='100px' />
                    </div>

                    <div>
                        <Button status='' text='Delete' normal={false} width='70px' />
                    </div>

                </div>

                <div className='table-actions-right'>
                    <Filter open={open} setOpen={setOpen} />

                </div>
            </div>

            <table>
                <thead>
                    <tr className='table-head'>
                        {structure && structure.head.map((item, index) => (
                            <th key={`header-${index}`}>{item}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {structure.type === "Members" && structure.body.map((item, index) => (
                        <tr key={`member-${index}`} className='table-row'>
                            <td>
                                <div style={{ display: "flex" }}>
                                    <div style={{ textAlign: "left" }} className='name-col'>
                                        <p className='name'>{item.name}</p>
                                        <p>{item.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p>{item.role}</p>
                            </td>
                            <td>
                                <p>{item.group}</p>
                            </td>
                            <td>
                                <p>{item.created}</p>
                            </td>
                            <td>
                                {item.actions}
                            </td>
                        </tr>
                    ))}

                    {structure.type === "Groups" && structure.body.map((item, index) => (
                        <tr key={`group-${index}`} className='table-row'>
                            <td>
                                <div className='name-col'>
                                    <p className='name'>{item.name}</p>
                                </div>
                            </td>
                            <td>
                                <p>{item.members}</p>
                            </td>
                            <td>
                                <p>{item.created}</p>
                            </td>
                            <td>
                                {item.actions}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <GroupMemberModal
                open={showMemberModal}
                setOpen={setShowMemberModal}
                groupId={selectedGroupId}
                currentMembers={selectedGroupMembers}
                onMemberAdded={() => {
                    setShowMemberModal(false);
                    // Šeit varētu pievienot funkciju, kas atjauno grupu sarakstu
                }}
            />
        </div>
    )
}

export default Table;