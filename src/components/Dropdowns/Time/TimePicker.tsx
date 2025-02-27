import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ArrowDown from '../../../assets/arrow-down.svg'

import '../index.scss'
import './_time.scss'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    onTimeSelect?: (time: string) => void
    initialValue?: string
}

let timeArray: Array<{text: string}> = []
let hours: number = 0;
let minutes: number = 0;

const TimePicker: React.FC<Props> = ({ open, setOpen, onTimeSelect, initialValue }) => {
    const [selectedTime, setSelectedTime] = useState<string>(initialValue || '');

    function timeStringFormater(): string {
        let output = "";

        if (hours < 10) {
            if (minutes === 0) {
                output = `0${hours}:00`
            } else {
                output = `0${hours}:30`
            }
        } else {
            if (minutes === 0) {
                output = `${hours}:00`
            } else {
                output = `${hours}:30`
            }
        }

        if (minutes === 0) {
            minutes = 30
        } else {
            minutes = 0
            hours += 1;
        }

        return output;
    }

    useEffect(() => {
        hours = 0;
        minutes = 0;

        timeArray = Array.from({ length: 48 }, () => ({
            text: timeStringFormater()
        }));
    }, []);

    useEffect(() => {
        if (initialValue) {
            setSelectedTime(initialValue);
        }
    }, [initialValue]);

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        if (onTimeSelect) {
            onTimeSelect(time);
        }
        setOpen(false); // Aizveram izvēlni pēc izvēles
    };

    return (
        <div className="time-picker">
            <div onClick={() => setOpen(!open)} className='dropdown time-dropdown'>
                <p>{selectedTime || "Izvēlieties laiku"}</p>
                <img className={open ? "rotate" : ''} src={ArrowDown} alt="Atvērt/Aizvērt" />

                {open && (
                    <div className='selector'>
                        {timeArray.map((item, index) => (
                            <div 
                                key={`time-${index}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleTimeSelect(item.text);
                                }} 
                                className={`row ${selectedTime === item.text ? 'selected' : ''}`}
                            >
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TimePicker;