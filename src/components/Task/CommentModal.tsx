import React, { useState } from 'react';
import { Task, Comment } from '../../types/types';
import { useAuth } from '../../contexts/AuthContext';
import { addComment, removeComment } from '../../firebase';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Close from '../../assets/close-button.svg';
import './_task.scss';

interface CommentModalProps {
    task: Task;
    open: boolean;
    setOpen: (open: boolean) => void;
    onCommentAdded: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ task, open, setOpen, onCommentAdded }) => {
    const { currentUser } = useAuth();
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!currentUser) {
            setError('Lietotājs nav autentificēts');
            return;
        }

        if (!newComment.trim()) {
            setError('Komentārs nevar būt tukšs');
            return;
        }

        try {
            setLoading(true);
            setError('');

            await addComment(task.id!, {
                text: newComment.trim(),
                createdBy: currentUser.uid,
                createdAt: new Date()
            });

            setNewComment('');
            onCommentAdded();
        } catch (error) {
            console.error('Kļūda pievienojot komentāru:', error);
            setError('Neizdevās pievienot komentāru');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (commentId: string) => {
        if (!currentUser) {
            setError('Lietotājs nav autentificēts');
            return;
        }

        try {
            setLoading(true);
            setError('');

            await removeComment(task.id!, commentId);
            onCommentAdded();
        } catch (error) {
            console.error('Kļūda dzēšot komentāru:', error);
            setError('Neizdevās dzēst komentāru');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleString('lv-LV', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <div 
                className="modal-backdrop"
                style={{ display: open ? 'flex' : 'none' }}
                onClick={() => setOpen(false)}
            />
            
            <div className={`comment-modal ${open ? 'active' : ''}`}>
                <div className="comment-modal-content">
                    <div className="comment-modal-header">
                        <h3>Komentāri - {task.title}</h3>
                        <img 
                            src={Close} 
                            alt="Aizvērt" 
                            onClick={() => setOpen(false)}
                            className="close-button"
                        />
                    </div>

                    <div className="comments-list">
                        {task.comments && task.comments.length > 0 ? (
                            task.comments.map((comment) => (
                                <div key={comment.id} className="comment-item">
                                    <div className="comment-header">
                                        <span className="comment-author">
                                            {comment.createdBy === currentUser?.uid ? 'Jūs' : 'Lietotājs'}
                                        </span>
                                        <span className="comment-date">
                                            {formatDate(comment.createdAt)}
                                        </span>
                                        {comment.createdBy === currentUser?.uid && (
                                            <button
                                                className="delete-comment"
                                                onClick={() => handleDelete(comment.id!)}
                                                disabled={loading}
                                            >
                                                Dzēst
                                            </button>
                                        )}
                                    </div>
                                    <p className="comment-text">{comment.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="no-comments">Nav komentāru</p>
                        )}
                    </div>

                    <div className="comment-form">
                        {error && <div className="error-message">{error}</div>}
                        <Input
                            hint="Pievienot komentāru"
                            inputValue={newComment}
                            onInputValueChange={setNewComment}
                            type="text"
                            field="textarea"
                            state={error ? "error" : ""}
                            error={error}
                            id="comment"
                            name="comment"
                        />
                        <Button
                            text={loading ? "Pievieno..." : "Pievienot komentāru"}
                            normal={true}
                            width="200px"
                            status={loading ? "disabled" : ""}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentModal; 