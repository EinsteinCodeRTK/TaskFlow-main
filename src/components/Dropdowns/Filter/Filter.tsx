
import "./_filter.scss"
import "../index.scss"

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const Filter: React.FC<Props> = ({ open, setOpen }) => {


    return (
        <div onClick={() => setOpen(!open)} className='dropdown filter-dropdown'>

            <div className="filter-button">
                <p>Filter by</p>
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

            <div style={{ display: open ? "flex" : "" }} className='drop'>
                <div className='row'>
                    <p>Date created</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 12 12"
                    >
                        <path
                            stroke="#40434D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                            d="M9.035 7.215L6 10.25 2.965 7.215M6 1.75v8.415"
                        ></path>
                    </svg>
                </div>

                <div className='row'>
                    <p>Date created</p>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 12 12"
                    >
                        <path
                            stroke="#40434D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                            d="M2.965 4.785L6 1.75l3.035 3.035M6 10.25V1.835"
                        ></path>
                    </svg>
                </div>

                <div className='row'>
                    <p>Name (A:Z)</p>
                </div>

                <div className='row'>
                    <p>Name (Z:A)</p>
                </div>
            </div>


        </div>
    )
}

export default Filter;