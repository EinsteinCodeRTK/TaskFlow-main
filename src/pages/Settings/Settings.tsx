import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'

import Input from "../../components/Input/Input";
import "./_settings.scss"
import Role from '../../components/Role/Role';

interface Props {
    pageTab: number
}

const Settings: React.FC<Props> = ({ pageTab }) => {


    const [value, changeValue] = useState<string>("")


    return (
        <div className="settings">

            <h2>Basic info</h2>

            <div className="line">

            </div>

            {pageTab == 0 &&
                <div className="card">

                    <div className="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#EF3C4A"
                                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                            ></path>
                            <path
                                fill="#fff"
                                d="M13.06 12l2.3-2.3c.29-.29.29-.77 0-1.06a.754.754 0 00-1.06 0l-2.3 2.3-2.3-2.3a.754.754 0 00-1.06 0c-.29.29-.29.77 0 1.06l2.3 2.3-2.3 2.3c-.29.29-.29.77 0 1.06.15.15.34.22.53.22s.38-.07.53-.22l2.3-2.3 2.3 2.3c.15.15.34.22.53.22s.38-.07.53-.22c.29-.29.29-.77 0-1.06l-2.3-2.3z"
                            ></path>
                        </svg>
                        <img src="data:image/png;base64,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" />
                        <p>Team photo</p>
                    </div>

                    <p>Team name</p>
                    <Input hint="Twitter" inputValue={value} onInputValueChange={changeValue} state="" error='' type='text' field='input' />
                </div>
            }

            {pageTab == 1 &&
                <div className="card">

                    <div className="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#EF3C4A"
                                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                            ></path>
                            <path
                                fill="#fff"
                                d="M13.06 12l2.3-2.3c.29-.29.29-.77 0-1.06a.754.754 0 00-1.06 0l-2.3 2.3-2.3-2.3a.754.754 0 00-1.06 0c-.29.29-.29.77 0 1.06l2.3 2.3-2.3 2.3c-.29.29-.29.77 0 1.06.15.15.34.22.53.22s.38-.07.53-.22l2.3-2.3 2.3 2.3c.15.15.34.22.53.22s.38-.07.53-.22c.29-.29.29-.77 0-1.06l-2.3-2.3z"
                            ></path>
                        </svg>
                        <img src="data:image/jpeg;base64,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" />
                        <p>Profile picture</p>
                    </div>

                    <p>First name</p>
                    <Input hint="" inputValue={value} onInputValueChange={changeValue} state="" error='' type='text' field='input' />

                    <p>Last name</p>
                    <Input hint="" inputValue={value} onInputValueChange={changeValue} state="" error='' type='text' field='input' />

                    <p>Group</p>
                    <Input hint="" inputValue={value} onInputValueChange={changeValue} state="" error='' type='text' field='input' />

                    <p>Role</p>
                    <Role />
                </div>
            }


        </div>
    )
}

export default Settings;