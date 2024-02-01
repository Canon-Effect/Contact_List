import React from "react";
import ContactRow from "./ContactRow";
import { useEffect, useState } from "react";

export default function ContactList() {
  const [contacts, setContacts] = useState([]); // Initialize
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch("https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users");
        const fetchedContacts = await response.json();
        setContacts(fetchedContacts);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContacts();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="3">Contact List</th>
        </tr>
      </thead>
      <tbody>
        {isLoading && <tr><td colSpan="3">Loading contacts...</td></tr>}
        {error && <tr><td colSpan="3">Error fetching contacts: {error.message}</td></tr>}
        {contacts.length > 0 &&
          contacts.map((contact) => (
            <ContactRow key={contact.id} contact={contact} />
          ))}
        {contacts.length === 0 && !isLoading && !error && (
          <tr>
            <td colSpan="3">No contacts found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}