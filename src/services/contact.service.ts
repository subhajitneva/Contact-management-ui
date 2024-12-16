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
      console.log(response.data);

      return response.data.data; // Assuming the API returns an array of contacts
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },
  async getcontact(id: number){
    try{
      const response = await axios.get(BASE_URL+"contact/display"+id);
      console.log(response.data)
      return response.data;
    }
    catch(error){
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
  async updateContact(id: number, updatedContact: Partial<Contact>): Promise<any> {
    try {
      const response = await axios.put(`${BASE_URL}contact/update/${id}`, updatedContact); // Sending PUT request
      console.log(response.data);
      return response.data; // Assuming the API returns a success message and updated contact id
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },
  async deleteContact(id: number): Promise<any> {
    try {
      const response = await axios.delete(`${BASE_URL}contact/remove/${id}`); // Sending DELETE request
      console.log(response.data);
      return response.data; // Assuming the API returns a success message
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },
};
