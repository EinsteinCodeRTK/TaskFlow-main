import React, { Dispatch, SetStateAction, useState } from 'react'

import Button from '../Button/Button';
import Filter from '../Dropdowns/Filter/Filter';
import GroupMemberModal from '../GroupMemberModal/GroupMemberModal';
import './_table.scss'



interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    structure: {
        type: string,
        head: Array<string>
        body: {
            img: string,
            name: string,
            email: string,
            role: string,
            group: string,
            created: string,
            icon_1: string,
            icon_2: string,
            members: number,
            date: string,
            plan: string,
            amount: string,
            status: boolean,
            id?: string,
            memberEmails?: string[]
        }[]
    }
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
                            </td>
                            <td>
                                <div style={{ display: "flex" }}>
                                    <img src={item.img} alt={item.name} />
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
                                {item.icon_1 === "edit" && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="none"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            stroke="#40434D"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeMiterlimit="10"
                                            strokeWidth="1.5"
                                            d="M8.84 2.4L3.366 8.193c-.206.22-.406.653-.446.953l-.247 2.16c-.087.78.473 1.314 1.247 1.18l2.146-.366c.3-.053.72-.273.927-.5l5.473-5.794c.947-1 1.374-2.14-.1-3.533C10.9.913 9.786 1.4 8.84 2.4zM7.927 3.367A4.084 4.084 0 0011.56 6.8M2 14.666h12"
                                        ></path>
                                    </svg>
                                )}
                            </td>
                            <td>
                                {item.icon_2 === "delete" && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="none"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            stroke="#40434D"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M14 3.987c-2.38-.32-4.787-.473-7.187-.473-1.42 0-2.84.1-4.26.3l-1.22.16M5.667 3.32l.146-1.087c.107-.8.187-1.4 1.667-1.4h1.64c1.48 0 1.573.627 1.673 1.4l.147 1.087M12.56 6.113l-.36 5.593c-.06 1.007-.107 1.787-2.187 1.787H5.987c-2.08 0-2.127-.78-2.187-1.787l-.36-5.593M6.887 10.333h2.22M6.333 7.833h3.333"
                                        ></path>
                                    </svg>
                                )}
                            </td>
                        </tr>
                    ))}

                    {structure.type === "Groups" && structure.body.map((item, index) => (
                        <tr key={`group-${index}`} className='table-row'>
                            <td>
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
                            </td>
                            <td>
                                <div className='name-col'>
                                    <p className='name'>{item.name}</p>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                            <td>
                                <p>{item.members}</p>
                            </td>
                            <td>
                                {item.id && (
                                    <Button
                                        status=""
                                        text="Pievienot dalībnieku"
                                        normal={true}
                                        width="fit-content"
                                        onClick={() => handleAddMember(item.id || '', item.memberEmails || [])}
                                    />
                                )}
                            </td>
                            <td>
                                <p>{item.created}</p>
                            </td>
                            <td>
                                {item.icon_1 === "edit" && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="none"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            stroke="#40434D"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeMiterlimit="10"
                                            strokeWidth="1.5"
                                            d="M8.84 2.4L3.366 8.193c-.206.22-.406.653-.446.953l-.247 2.16c-.087.78.473 1.314 1.247 1.18l2.146-.366c.3-.053.72-.273.927-.5l5.473-5.794c.947-1 1.374-2.14-.1-3.533C10.9.913 9.786 1.4 8.84 2.4zM7.927 3.367A4.084 4.084 0 0011.56 6.8M2 14.666h12"
                                        ></path>
                                    </svg>
                                )}
                            </td>
                            <td>
                                {item.icon_2 === "delete" && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="none"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            stroke="#40434D"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M14 3.987c-2.38-.32-4.787-.473-7.187-.473-1.42 0-2.84.1-4.26.3l-1.22.16M5.667 3.32l.146-1.087c.107-.8.187-1.4 1.667-1.4h1.64c1.48 0 1.573.627 1.673 1.4l.147 1.087M12.56 6.113l-.36 5.593c-.06 1.007-.107 1.787-2.187 1.787H5.987c-2.08 0-2.127-.78-2.187-1.787l-.36-5.593M6.887 10.333h2.22M6.333 7.833h3.333"
                                        ></path>
                                    </svg>
                                )}
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