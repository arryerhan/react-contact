import { IoClose } from "react-icons/io5";
import Field from "./Field";
import axios from "axios";


const Modal = ({ isModalOpen, close, setContacts, editItem }) => {

  const handleSubmit = (e) => {
    e.preventDefault();


    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData.entries());

    if (!editItem) {
      axios
        .post("/contact", newContact)
        .then((res) => {
          setContacts((contacts) => [...contacts, res.data]);
        });
    } else {
      axios
        .put(`/contact/${editItem.id}`, newContact)
        .then((res) => {
          setContacts((contacts) =>
            contacts.map((contact) =>
              contact.id === editItem.id ? res.data : contact
            )
          );
        });
    }
    close();
  };

  return (
    isModalOpen && (
      <div className="modal">
        <div className="modal-inner">
          <div className="modal-head">
            <h2>{editItem ? "Update Contact" : "Create New Contact"}</h2>
            <button onClick={close}>
              <IoClose />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <Field
              value={editItem?.name}
              label="Full Name"
              name="name"
            />

            <Field
              value={editItem?.position}
              label="Position"
              name="position"
            />
            <Field
              value={editItem?.company}
              label="Company"
              name="company"
            />
            <Field value={editItem?.phone} label="Phone" name="phone" />
            <Field value={editItem?.email} label="Email" name="email" />

            <div className="buttons">
              <button type="button" onClick={close}>
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;