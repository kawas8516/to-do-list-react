import Modal from './Modal';

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <div className="modal-body">
        <p>{message}</p>
      </div>
      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm} autoFocus>
          Delete
        </button>
      </div>
    </Modal>
  );
}
