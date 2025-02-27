import React, { useState, useEffect } from 'react';
import { updateMember } from '../../firebase';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './_editMemberModal.scss';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  member: {
    id: string;
    displayName: string;
    email: string;
    role: string;
  } | null;
  onMemberUpdated?: () => void;
}

const EditMemberModal: React.FC<Props> = ({ open, setOpen, member, onMemberUpdated }) => {
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member) {
      setDisplayName(member.displayName);
      setRole(member.role);
    }
  }, [member]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!displayName.trim()) {
        throw new Error('Lūdzu, ievadiet dalībnieka vārdu');
      }

      if (!member?.id) {
        throw new Error('Dalībnieka ID nav atrasts');
      }

      await updateMember(member.id, {
        displayName: displayName.trim(),
        role: role
      });
      
      setOpen(false);
      if (onMemberUpdated) {
        onMemberUpdated();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Neizdevās atjaunināt dalībnieku');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDisplayName('');
    setRole('');
    setError('');
    setOpen(false);
  };

  if (!open || !member) return null;

  return (
    <div className="modal-container">
      <div className="modal-backdrop" onClick={handleClose} />
      <div className="edit-member-modal">
        <div className="modal-header">
          <h2>Edit member</h2>
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
            <label>Name</label>
            <Input
              hint="Enter member name"
              inputValue={displayName}
              onInputValueChange={setDisplayName}
              state={error ? "error" : ""}
              error={error}
              type="text"
              field="input"
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
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

export default EditMemberModal; 