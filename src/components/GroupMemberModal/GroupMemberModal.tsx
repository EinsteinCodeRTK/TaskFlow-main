import React, { useState } from 'react';
import { updateGroup } from '../../firebase';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './_groupMemberModal.scss';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  groupId: string;
  currentMembers: string[];
  onMemberAdded?: () => void;
}

const GroupMemberModal: React.FC<Props> = ({ open, setOpen, groupId, currentMembers, onMemberAdded }) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email) {
        throw new Error('Lūdzu, ievadiet e-pasta adresi');
      }

      // Pārbaudām, vai e-pasts jau nav pievienots
      if (currentMembers.includes(email)) {
        throw new Error('Šis lietotājs jau ir grupā');
      }

      // Pievienojam jauno dalībnieku
      const updatedMembers = [...currentMembers, email];
      await updateGroup(groupId, { members: updatedMembers });

      setEmail('');
      setOpen(false);
      if (onMemberAdded) {
        onMemberAdded();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Neizdevās pievienot dalībnieku');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="modal-container">
      <div className="modal-backdrop" onClick={handleClose} />
      <div className="group-member-modal">
        <div className="modal-header">
          <h2>Pievienot dalībnieku</h2>
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
            <label>E-pasta adrese</label>
            <Input
              hint="Ievadiet e-pasta adresi"
              inputValue={email}
              onInputValueChange={setEmail}
              state={error ? "error" : ""}
              error={error}
              type="email"
              field="input"
            />
          </div>

          <div className="modal-footer">
            <Button
              status={loading ? "loading" : ""}
              text="Pievienot"
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

export default GroupMemberModal; 