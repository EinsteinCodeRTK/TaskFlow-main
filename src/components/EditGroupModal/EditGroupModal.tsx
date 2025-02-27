import React, { useState, useEffect } from 'react';
import { updateGroup } from '../../firebase';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './_editGroupModal.scss';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  group: {
    id: string;
    name: string;
    members: string[];
  } | null;
  onGroupUpdated?: () => void;
}

const EditGroupModal: React.FC<Props> = ({ open, setOpen, group, onGroupUpdated }) => {
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (group) {
      setGroupName(group.name);
    }
  }, [group]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!groupName.trim()) {
        throw new Error('Lūdzu, ievadiet grupas nosaukumu');
      }

      if (!group?.id) {
        throw new Error('Grupas ID nav atrasts');
      }

      await updateGroup(group.id, {
        name: groupName.trim()
      });
      
      setOpen(false);
      if (onGroupUpdated) {
        onGroupUpdated();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Neizdevās atjaunināt grupu');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setGroupName('');
    setError('');
    setOpen(false);
  };

  if (!open || !group) return null;

  return (
    <div className="modal-container">
      <div className="modal-backdrop" onClick={handleClose} />
      <div className="edit-group-modal">
        <div className="modal-header">
          <h2>Edit group</h2>
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
              text="Save changes"
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

export default EditGroupModal; 