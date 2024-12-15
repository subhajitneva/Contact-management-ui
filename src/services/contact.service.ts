import axios from 'axios';

// Define the base URL for your API
const BASE_URL = 'http://www.localhost:3000/'; // Replace with the actual API URL

// Create an interface to define the structure of the contact data
export interface Contact {
  id: number;
  fname: string;
  lname: string;
  phoneNo: number;
  // Add more fields as necessary
}

// Define the service to interact with the contacts API
export const contactService = {
  // Function to get contacts
  async getContacts(): Promise<Contact[]> {
    try {
      const response = await axios.get(BASE_URL+"contact/display");
      console.log(response.data.data.data);

      return response.data.data.data; // Assuming the API returns an array of contacts
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },
  // Function to create a new contact
  async createContact(newContact: Contact): Promise<Contact> {
    try {
      const response = await axios.post(BASE_URL+'contact/create', newContact); // Sending POST request
      return response.data; // Assuming the API returns the created contact
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },
};