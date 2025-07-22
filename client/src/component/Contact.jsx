import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import CircleLoader from 'react-spinners/CircleLoader';
import { toast } from 'react-toastify';

const customStyles = {
  headCells: {
    style: { fontSize: '15px', fontWeight: 600 },
  },
  cells: {
    style: { fontSize: '13px', fontWeight: 500 },
  },
};

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchContacts = async () => {
    if (!token) {
      toast.error('Unauthorized! Please login again.');
      return;
    }
    try {
      const res = await axios.get('http://localhost:3000/contactmsyt/contact', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setContacts(res.data.contacts);
      }
    } catch (err) {
      console.error('Fetch contacts error:', err.response?.data || err.message);
      toast.error('Failed to fetch contacts!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:3000/contactmsyt/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success('Contact deleted!');
        fetchContacts();
      } else {
        toast.error(res.data.message || 'Failed to delete!');
      }
    } catch (err) {
      console.error('Delete contact error:', err.response?.data || err.message);
      toast.error('Something went wrong while deleting');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const columns = [
    { name: 'Name', selector: (row) => row.name },
    { name: 'Email', selector: (row) => row.email },
    { name: 'Phone', selector: (row) => row.phone },
    {
      name: 'Action',
      cell: (row) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <FaPenToSquare
            className="table-icon1"
            style={{ cursor: 'pointer' }}
            onClick={() => toast.info('Edit functionality coming soon!')}
          />
          <FaRegTrashCan
            className="table-icon2"
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={() => handleDelete(row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <CircleLoader loading={loading} size={50} />
        </div>
      ) : (
        <div className="contact-list">
          <DataTable
            columns={columns}
            data={contacts}
            customStyles={customStyles}
            pagination
            highlightOnHover
            pointerOnHover
          />
          {contacts.length === 0 && <h3 style={{ textAlign: 'center' }}>Add a contact to get started</h3>}
        </div>
      )}
    </>
  );
};

export default Contact;
