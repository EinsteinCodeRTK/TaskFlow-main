import Button from "../../components/Button/Button"
import Table from "../../components/Table/Table"
import "./_payments.scss"

import React, { Dispatch, SetStateAction, useState } from 'react'


interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    pageTab: number
}


const Payments: React.FC<Props> = ({ open, setOpen, pageTab }) => {


    const structure = {
        type: "Payments",
        head: ["", "DATE", "PLAN", "MEMBERS", "AMOUNT", "STATUS", "", ""],
        body: [
            {
                img: "",
                name: "Developers",
                email: "",
                role: "",
                group: "",
                created: "21-09-2022 16:35",
                icon_1: "eye",
                icon_2: "download",
                members: 1,
                date: "Sep 1, 2023",
                plan: "Mid",
                amount: "100.00 €",
                status: true
            },
            {
                img: "",
                name: "Developers",
                email: "",
                role: "",
                group: "",
                created: "21-09-2022 16:35",
                icon_1: "eye",
                icon_2: "download",
                members: 1,
                date: "Sep 1, 2023",
                plan: "Mid",
                amount: "150.00 €",
                status: false
            }
        ]
    }

    return (
        <div className="payments">

            {pageTab == 0 &&
                <>
                    <div className="row">
                        <div className="card">
                            <p>Payment plan</p>
                            <h2>Mid team</h2>
                        </div>
                        <div className="card">
                            <p>Next invoice issue date</p>
                            <h2>Oct 1, 2023</h2>
                        </div>
                        <div className="card">
                            <p>Amount due</p>
                            <h2>100.00 €</h2>
                        </div>
                    </div>

                    <Table open={open} setOpen={setOpen} structure={structure} />
                </>
            }

            {pageTab == 1 &&
                <>
                    <div className="row">
                        <div className="card payment-method">
                            <div className="holder-name">
                                <h2>Sam Smith</h2>
                                <div className="primary">
                                    <p>PRIMARY</p>
                                </div>
                            </div>
                            <div className="card-info">
                                <img src="data:image/png;base64,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" />
                                <div>
                                    <h2>Visa****4242</h2>
                                    <p>Card expires at 09/24</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
            }


            {pageTab == 2 &&
                <>

                    <div className="row">
                        <div className="card payment-plan">
                            <p>Payment plan</p>
                            <h2>Mid team</h2>
                            <p className="small">100.00 € billed monthly</p>

                            <Button status="" text="Upgrade plan" normal={true} width="fit-content" />
                        </div>

                    </div>

                </>
            }
        </div>
    )
}

export default Payments;