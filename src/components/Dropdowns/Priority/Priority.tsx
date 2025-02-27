import React, { Dispatch, SetStateAction, useState } from 'react'
import '../index.scss'
import './_priority.scss'
import { TaskPriority } from '../../../types/types'

import ArrowDown from '../../../assets/arrow-down.svg'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    onSelect?: (value: TaskPriority) => void
}

const Priority: React.FC<Props> = ({open, setOpen, onSelect}) => {
    const [priority, setPriority] = useState<{class: string, name: TaskPriority}>({class: "", name: "MEDIUM"})

    const handleSelect = (newPriority: {class: string, name: TaskPriority}) => {
        setPriority(newPriority)
        if (onSelect) {
            onSelect(newPriority.name)
        }
        setOpen(false)
    }

    return (
        <div onClick={() => setOpen(!open)} className='dropdown priority-dropdown'>
            <img className={open ? "rotate" : ''} src={ArrowDown} alt="Toggle dropdown" />
            <div className='row'>
                <div className={`icon ${priority.class}`}>
                </div>
                <p className={`${priority.class}`}>{priority.name}</p>
            </div>

            <div style={{ display: open ? "flex" : "" }} className='drop'>
                <div onClick={() => handleSelect({class:"GREEN", name: "LOW"})} className='row'>
                    <div className='icon GREEN'>
                    </div>
                    <p className='GREEN'>LOW</p>
                </div>

                <div onClick={() => handleSelect({class:"YELLOW", name: "MEDIUM"})} className='row'>
                    <div className='icon YELLOW'>
                    </div>
                    <p className='YELLOW'>MEDIUM</p>
                </div>

                <div onClick={() => handleSelect({class:"RED", name: "HIGH"})} className='row'>
                    <div className='icon RED'>
                    </div>
                    <p className='RED'>HIGH</p>
                </div>
            </div>
        </div>
    )
}

export default Priority