import './_main.scss'
import { useState } from 'react';
import Tasks from "../Tasks/Tasks";

import Logo from "../../assets/TaskFlow_logo.png"

import TaskModal from '../../components/Task Modal/TaskModal';
import PaymentModal from '../../components/Task Modal/PaymentModal';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import Team from '../Team/Team';
import Payments from '../Payments/Payments';
import Settings from '../Settings/Settings';



const Main: React.FC = () => {

    const [page, setPage] = useState<number>(0)
    const [pageTab, setPageTab] = useState<number>(0)
    const [open, setOpen] = useState<boolean>(false);
    const [openF, setOpenF] = useState<boolean>(false);

    const pages = ["Tasks", "Team", "Payments", "Settings"]

    function close() {


        if (openF) {
            setOpenF(false)
        }
    }

    function changePage(number: number) {
        setPageTab(0)
        setPage(number)
    }


    return (
        <div onClick={() => close()} className='main'>

            <div className='left-nav'>
                <img src={Logo} />

                <div onClick={() => changePage(0)} className={page == 0 ? "row selected" : "row"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="#40434D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12.37 8.88h5.25M6.38 8.88l.75.75 2.25-2.25M12.37 15.88h5.25M6.38 15.88l.75.75 2.25-2.25"
                        ></path>
                        <path
                            stroke="#40434D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"
                        ></path>
                    </svg>
                    <p>Tasks</p>
                </div>

                <div onClick={() => changePage(1)} className={page == 1 ? "row selected" : "row"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="#40434D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.16 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 01-4.27-4.43C4.56 3.99 6.54 2 9 2a4.435 4.435 0 01.16 8.87zM16.41 4c1.94 0 3.5 1.57 3.5 3.5 0 1.89-1.5 3.43-3.37 3.5a1.13 1.13 0 00-.26 0M4.16 14.56c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.74-1.83-7.25-1.83-10.01 0zM18.34 20c.72-.15 1.4-.44 1.96-.87 1.56-1.17 1.56-3.1 0-4.27-.55-.42-1.22-.7-1.93-.86"
                        ></path>
                    </svg>
                    <p>Team</p>
                </div>

                <div onClick={() => changePage(2)} className={page == 2 ? "row selected" : "row"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="#40434D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 11.15H7M2 11.15V6.53c0-2.04 1.65-3.69 3.69-3.69h5.62c2.04 0 3.69 1.27 3.69 3.31"
                        ></path>
                        <path
                            stroke="#40434D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.48 12.2c-.5.48-.74 1.22-.54 1.98.25.93 1.17 1.52 2.13 1.52H20v1.45c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4v-7c0-2.21 1.79-4 4-4h10c2.2 0 4 1.8 4 4v1.45h-1.08c-.56 0-1.07.22-1.44.6z"
                        ></path>
                        <path
                            stroke="#40434D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M22 12.62v2.06c0 .56-.46 1.02-1.03 1.02h-1.93c-1.08 0-2.07-.79-2.16-1.87-.06-.63.18-1.22.6-1.63.37-.38.88-.6 1.44-.6h2.05c.57 0 1.03.46 1.03 1.02z"
                        ></path>
                    </svg>
                    <p>Payments</p>
                </div>

                <div onClick={() => changePage(3)} className={page == 3 ? "row selected" : "row"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="#40434D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                            d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                        ></path>
                        <path
                            stroke="#40434D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                            d="M2 12.88v-1.76c0-1.04.85-1.9 1.9-1.9 1.81 0 2.55-1.28 1.64-2.85-.52-.9-.21-2.07.7-2.59l1.73-.99c.79-.47 1.81-.19 2.28.6l.11.19c.9 1.57 2.38 1.57 3.29 0l.11-.19c.47-.79 1.49-1.07 2.28-.6l1.73.99c.91.52 1.22 1.69.7 2.59-.91 1.57-.17 2.85 1.64 2.85 1.04 0 1.9.85 1.9 1.9v1.76c0 1.04-.85 1.9-1.9 1.9-1.81 0-2.55 1.28-1.64 2.85.52.91.21 2.07-.7 2.59l-1.73.99c-.79.47-1.81.19-2.28-.6l-.11-.19c-.9-1.57-2.38-1.57-3.29 0l-.11.19c-.47.79-1.49 1.07-2.28.6l-1.73-.99a1.899 1.899 0 01-.7-2.59c.91-1.57.17-2.85-1.64-2.85-1.05 0-1.9-.86-1.9-1.9z"
                        ></path>
                    </svg>
                    <p>Settings</p>
                </div>
            </div>

            <div className='right'>
                <div className='top-nav'>
                    <input 
                        placeholder='Search' 
                        id="search"
                        name="search"
                        type="search"
                    />

                    <div className='top-nav-right'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="#40434D"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zM8 12h8M12 16V8"
                            ></path>
                        </svg>


                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="#40434D"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                                d="M12.02 2.91c-3.31 0-6 2.69-6 6v2.89c0 .61-.26 1.54-.57 2.06L4.3 15.77c-.71 1.18-.22 2.49 1.08 2.93 4.31 1.44 8.96 1.44 13.27 0 1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06V8.91c0-3.3-2.7-6-6-6z"
                            ></path>
                            <path
                                stroke="#40434D"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                                d="M13.87 3.2a6.754 6.754 0 00-3.7 0c.29-.74 1.01-1.26 1.85-1.26.84 0 1.56.52 1.85 1.26z"
                            ></path>
                            <path
                                stroke="#40434D"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                                d="M15.02 19.06c0 1.65-1.35 3-3 3-.82 0-1.58-.34-2.12-.88a3.01 3.01 0 01-.88-2.12"
                            ></path>
                        </svg>


                        <div className='teams-dropdown'>
                            <img src="data:image/png;base64,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" />

                            <div className='team'>
                                <p>Team</p>
                                <p className='team-name'>Youtube</p>
                            </div>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    stroke="#949BB3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="1.5"
                                    d="M13.28 5.967l-4.347 4.346a1.324 1.324 0 01-1.867 0L2.72 5.967"
                                ></path>
                            </svg>
                        </div>

                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww&w=1000&q=80" />
                    </div>

                </div>

                <div className='head'>
                    <h2>{pages[page]}</h2>
                    <div onClick={() => setOpen(true)} style={{ marginRight: "30px" }}>

                        {page == 0 && <Button status='' text='Add task' normal={true} width='100px' />}
                        {page == 1 && pageTab == 0 && <Button status='' text='Add people' normal={true} width='fit-content' />}
                        {page == 1 && pageTab == 1 && <Button status='' text='Create group' normal={true} width='fit-content' />}
                        {page == 2 && pageTab == 1 && <Button status='' text='Add payment method' normal={true} width='fit-content' />}
                    </div>

                </div>

                <div className='body'>
                    {page == 0 &&
                        <Tasks />
                    }

                    {page == 1 &&
                        <>
                            <div className='tab-nav'>
                                <div onClick={() => setPageTab(0)} className={pageTab == 0 ? 'tab-nav-page-selected' : 'tab-nav-page'}>
                                    <h2>Members</h2>
                                </div>
                                <div onClick={() => setPageTab(1)} className={pageTab == 1 ? 'tab-nav-page-selected' : 'tab-nav-page'}>
                                    <h2>Groups</h2>
                                </div>
                            </div>
                            <Team open={openF} setOpen={setOpenF} pageTab={pageTab} />
                        </>
                    }

                    {page == 2 &&
                        <>
                            <div className='tab-nav'>
                                <div onClick={() => setPageTab(0)} className={pageTab == 0 ? 'tab-nav-page-selected' : 'tab-nav-page'}>
                                    <h2>Overview</h2>
                                </div>
                                <div onClick={() => setPageTab(1)} className={pageTab == 1 ? 'tab-nav-page-selected' : 'tab-nav-page'}>
                                    <h2>Payment method</h2>
                                </div>
                                <div onClick={() => setPageTab(2)} className={pageTab == 2 ? 'tab-nav-page-selected' : 'tab-nav-page'}>
                                    <h2>Payment plan</h2>
                                </div>
                            </div>
                            <Payments open={openF} setOpen={setOpenF} pageTab={pageTab} />
                        </>
                    }

                    {page == 3 &&
                        <>
                            <div className='tab-nav'>
                                <div onClick={() => setPageTab(0)} className={pageTab == 0 ? 'tab-nav-page-selected' : 'tab-nav-page'}>
                                    <h2>Team</h2>
                                </div>
                                <div onClick={() => setPageTab(1)} className={pageTab == 1 ? 'tab-nav-page-selected' : 'tab-nav-page'}>
                                    <h2>User</h2>
                                </div>
                            </div>
                            <Settings pageTab={pageTab} />
                        </>
                    }
                </div>

            </div>

            {page == 0 && (
                <TaskModal 
                    open={open} 
                    setOpen={setOpen} 
                    onTaskCreated={() => {
                        window.location.reload();
                    }}
                />
            )}
            
            {page == 1 && pageTab == 0 && (
                <PaymentModal 
                    open={open} 
                    setOpen={setOpen} 
                    task="Add people" 
                    text="Add people to your network via email invitation" 
                />
            )}
            
            {page == 1 && pageTab == 1 && (
                <PaymentModal 
                    open={open} 
                    setOpen={setOpen} 
                    task="Create group" 
                    text="E.g. you can organise people by their position or department." 
                />
            )}
            
            {page == 2 && pageTab == 1 && (
                <PaymentModal 
                    open={open} 
                    setOpen={setOpen} 
                    task="Add payment method" 
                    text="" 
                />
            )}

        </div>
    )

}

export default Main;