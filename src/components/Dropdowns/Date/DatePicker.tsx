import '../index.scss'
import './_date.scss'

import { format } from 'date-fns';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import ArrowDown from '../../../assets/arrow-down.svg'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    onSelect?: (value: string) => void
}

const DatePicker: React.FC<Props> = ({ open, setOpen, onSelect }) => {
    const [selected, setSelected] = useState<Date>();
    const [selectedDate, setSelectedDate] = useState<string>();

    let footer = <p>Please pick a day.</p>;

    var date = new Date();
    date.setDate(date.getDate() - 1);

    const disabledDays = [
        { from: new Date(0), to: date }
    ];

    useEffect(() => {
        if (selected) {
            const formattedDate = format(selected, 'yyyy-MM-dd');
            setSelectedDate(format(selected, 'dd-MM-yyyy'));
            
            if (onSelect) {
                onSelect(formattedDate);
            }
            
            setOpen(false);
        }
    }, [selected, setOpen, onSelect]);

    return (
        <div className='date-dropdown'>
            <div onClick={() => setOpen(!open)} className='dropdown date-dropdown'>
                <p>{selectedDate || "Select date"}</p>
                <img className={open ? "rotate" : ''} src={ArrowDown} alt="Toggle dropdown" />
            </div>

            {/*
            <div onClick={() => setOpen(false)} className='back' style={{ display: open ? "flex" : "none" }}>
            </div>
    */}

            <div style={{ display: open ? "flex" : "", marginTop: "140px" }} className='drop'>
                <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    footer={footer}
                    disabled={disabledDays}
                />
            </div>
        </div>
    )
}

export default DatePicker;
