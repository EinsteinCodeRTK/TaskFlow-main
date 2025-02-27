import './_task-modal.scss'
import React, { useState, Dispatch, SetStateAction } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { createTask } from '../../firebase'
import { TaskPriority } from '../../types/types'

import Input from '../Input/Input'
import Priority from '../Dropdowns/Priority/Priority'
import DatePicker from '../Dropdowns/Date/DatePicker'
import TimePicker from '../Dropdowns/Time/TimePicker'

import Upload from '../../assets/document-upload.svg'
import Close from '../../assets/close-button.svg'
import Button from '../Button/Button'
import Role from '../Role/Role'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    onTaskCreated?: () => void
}

// Papildus interfeisi komponentiem
interface PriorityProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    onSelect: (value: string) => void
}

interface DatePickerProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    onSelect: (value: string) => void
}

const TaskModal: React.FC<Props> = ({ open, setOpen, onTaskCreated }) => {
    const { currentUser } = useAuth();
    
    // Task form state
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
    const [dueDate, setDueDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    
    // People form state
    const [email, setEmail] = useState<string>("");
    const [group, setGroup] = useState<string>("");
    const [role, setRole] = useState<string>("");
    
    // Group form state
    const [groupName, setGroupName] = useState<string>("");
    const [members, setMembers] = useState<string>("");
    
    // Payment form state
    const [cardholderName, setCardholderName] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [expirationDate, setExpirationDate] = useState<string>("");
    const [cvc, setCvc] = useState<string>("");
    
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [openP, setOpenP] = useState<boolean>(false)
    const [openD, setOpenD] = useState<boolean>(false)
    const [openT, setOpenT] = useState<boolean>(false)

    function dropdownChecker(): void {
        if (openP) {
            setOpenP(false)
        }

        if (openT) {
            setOpenT(false)
        }
    }

    async function handleSubmit(): Promise<void> {
        if (!currentUser) {
            setError('Lietotājs nav autentificēts');
            return;
        }

        // Validācija
        if (!title.trim()) {
            setError('Nosaukums ir obligāts');
            return;
        }
        if (!description.trim()) {
            setError('Apraksts ir obligāts');
            return;
        }
        if (!dueDate) {
            setError('Datums ir obligāts');
            return;
        }
        if (!time) {
            setError('Laiks ir obligāts');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const taskData = {
                title: title.trim(),
                description: description.trim(),
                priority,
                dueDate: dueDate ? new Date(dueDate) : new Date(),
                time,
                assignedTo: [],
                createdBy: currentUser.uid,
                createdAt: new Date(),
                status: 'TODO',
                comments: []
            };

            await createTask(taskData);
            
            if (onTaskCreated) {
                onTaskCreated();
            }
            
            closeEverything();
        } catch (error) {
            console.error('Error creating task:', error);
            setError('Kļūda veidojot uzdevumu');
        } finally {
            setLoading(false);
        }
    }

    function closeEverything(): void {
        setOpen(false);
        setOpenP(false);
        setOpenD(false);
        setOpenT(false);
        // Reset task form
        setTitle("");
        setDescription("");
        setPriority("MEDIUM");
        setDueDate("");
        setTime("");
        // Reset people form
        setEmail("");
        setGroup("");
        setRole("");
        // Reset group form
        setGroupName("");
        setMembers("");
        // Reset payment form
        setCardholderName("");
        setCardNumber("");
        setExpirationDate("");
        setCvc("");
        // Reset error
        setError("");
    }

    return (
        <div>
            <div onClick={closeEverything} style={{ display: open ? "flex" : "none" }} className="task-modal-backdrop">
            </div>

            <div onClick={() => dropdownChecker()} className={open ? 'modal active' : 'modal'}>
                <div>
                    <div className='head'>
                        <h2>Create task</h2>
                        <img onClick={() => setOpen(false)} src={Close} alt="Close" />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className='content'>
                        <Input
                            hint="Title"
                            inputValue={title}
                            onInputValueChange={setTitle}
                            type="text"
                            field="input"
                            state={error && !title ? "error" : ""}
                            error={error && !title ? "Title is required" : ""}
                            id="title"
                            name="title"
                        />

                        <Input
                            hint="Description"
                            inputValue={description}
                            onInputValueChange={setDescription}
                            type="text"
                            field="textarea"
                            state={error && !description ? "error" : ""}
                            error={error && !description ? "Description is required" : ""}
                            id="description"
                            name="description"
                        />

                        <div className='row'>
                            <Priority open={openP} setOpen={setOpenP} onSelect={setPriority} />
                            <DatePicker open={openD} setOpen={setOpenD} onSelect={setDueDate} />
                            <TimePicker 
                                open={openT} 
                                setOpen={setOpenT} 
                                onTimeSelect={setTime}
                                initialValue={time}
                            />
                        </div>

                        <div className='row'>
                            <Button
                                text="Cancel"
                                normal={false}
                                width="120px"
                                status=""
                                onClick={closeEverything}
                            />
                            <Button
                                text={loading ? "Creating..." : "Create"}
                                normal={true}
                                width="120px"
                                status={loading ? "disabled" : ""}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskModal;