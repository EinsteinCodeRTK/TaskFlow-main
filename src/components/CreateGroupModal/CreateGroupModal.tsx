import React, { useState } from 'react';
import { createGroup } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './_createGroupModal.scss';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onGroupCreated?: () => void;
}

const CreateGroupModal: React.FC<Props> = ({ open, setOpen, onGroupCreated }) => {
  const { currentUser } = useAuth();
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!groupName.trim()) {
        throw new Error('Lūdzu, ievadiet grupas nosaukumu');
      }

      if (!currentUser) {
        throw new Error('Nav autorizēts lietotājs');
      }

      const groupData = {
        name: groupName.trim(),
        members: [currentUser.email],
        createdBy: currentUser.uid
      };

      await createGroup(groupData);
      
      setGroupName('');
      setOpen(false);
      if (onGroupCreated) {
        onGroupCreated();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Neizdevās izveidot grupu');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setGroupName('');
    setError('');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="modal-container">
      <div className="modal-backdrop" onClick={handleClose} />
      <div className="create-group-modal">
        <div className="modal-header">
          <h2>Create group</h2>
          <button className="close-button" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <p className="modal-description">
          E.g. you can organise people by their position or department.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Group name</label>
            <Input
              hint="Enter group name"
              inputValue={groupName}
              onInputValueChange={setGroupName}
              state={error ? "error" : ""}
              error={error}
              type="text"
              field="input"
            />
          </div>

          <div className="modal-footer">
            <Button
              status={loading ? "loading" : ""}
              text="Create"
              normal={true}
              width="fit-content"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal; 