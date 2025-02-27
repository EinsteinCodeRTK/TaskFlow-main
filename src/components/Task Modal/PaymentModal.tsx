import './_task-modal.scss';
import React, { useState, Dispatch, SetStateAction } from 'react';

import Input from '../Input/Input';
import Priority from '../Dropdowns/Priority/Priority';
import Date from '../Dropdowns/Date/DatePicker';
import TimePicker from '../Dropdowns/Time/TimePicker';

import Upload from '../../assets/document-upload.svg';
import Close from '../../assets/close-button.svg';
import Button from '../Button/Button';
import Role from '../Role/Role';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  task: string;
  text: string;
}

const TaskModal: React.FC<Props> = ({ open, setOpen, task, text }) => {
  const [openP, setOpenP] = useState<boolean>(false);
  const [openD, setOpenD] = useState<boolean>(false);
  const [openT, setOpenT] = useState<boolean>(false);

  const [cardholderName, setCardholderName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const closeEverything = (): void => {
    setOpen(false);
    setOpenP(false);
    setOpenD(false);
    setOpenT(false);
    resetForm();
  };

  const resetForm = (): void => {
    setCardholderName('');
    setCardNumber('');
    setExpirationDate('');
    setCvc('');
    setFormError('');
  };

  const handleAddPaymentMethod = (): void => {
    // Basic validation
    if (!cardholderName || !cardNumber || !expirationDate || !cvc) {
      setFormError('Please fill out all fields.');
      return;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      setFormError('Card number must be 16 digits.');
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
      setFormError('Expiration date must be in MM/YY format.');
      return;
    }

    if (!/^\d{3}$/.test(cvc)) {
      setFormError('CVC must be 3 digits.');
      return;
    }

    // Placeholder for saving the payment data
    const paymentData = {
      cardholderName,
      cardNumber,
      expirationDate,
      cvc,
    };

    console.log('Payment data submitted:', paymentData);

    // Reset form and close modal
    resetForm();
    setOpen(false);

    // Ideally, this is where you'd make an API call to save the data
    // Example: await api.savePaymentMethod(paymentData);
  };

  return (
    <div>
      <div
        onClick={() => closeEverything()}
        style={{ display: open ? 'flex' : 'none' }}
        className="task-modal-backdrop"
      ></div>

      <div onClick={() => {}} className={open ? 'modal active' : 'modal'}>
        {task === 'Add payment method' && (
          <div>
            <div className="head">
              <h2>Add payment method</h2>
              <img onClick={() => setOpen(false)} src={Close} alt="Close" />
            </div>

            <div className="row">
              <p>Cardholder's name</p>
              <Input
                hint="Name and surname"
                inputValue={cardholderName}
                onInputValueChange={setCardholderName}
                state=""
                error=""
                type="text"
                field="input"
                id="cardholder-name"
                name="cardholder-name"
              />
            </div>

            <div className="row">
              <p>Card number</p>
              <Input
                hint="0000 0000 0000 0000"
                inputValue={cardNumber}
                onInputValueChange={setCardNumber}
                state=""
                error=""
                type="text"
                field="input"
                id="card-number"
                name="card-number"
              />
            </div>

            <div className="row">
              <p>Expiration date</p>
              <Input
                hint="MM/YY"
                inputValue={expirationDate}
                onInputValueChange={setExpirationDate}
                state=""
                error=""
                type="text"
                field="input"
                id="expiration-date"
                name="expiration-date"
              />
            </div>

            <div className="row">
              <p>CVC</p>
              <Input
                hint="123"
                inputValue={cvc}
                onInputValueChange={setCvc}
                state=""
                error=""
                type="text"
                field="input"
                id="card-cvc"
                name="card-cvc"
              />
            </div>

            {formError && <div className="error">{formError}</div>}

            <div onClick={handleAddPaymentMethod}>
              <Button status="" text="Add" normal={true} width="100%" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;
