import { Component, State, h } from '@stencil/core';
import { contactService, Contact } from '../../services/contact.service';

@Component({
  tag: 'contact-ui',
  styleUrl: 'contact-ui.scss',
  shadow: true,
})
export class ContactUi {
  @State() showModal: boolean = false;
  @State() currentPage: number = 1;
  @State() rowsPerPage: number = 5;
  @State() data: Contact[] = [];
  @State() currentRowIndex: number = -1;
  @State() formData: Partial<Contact> = { fname: '', lname: '', phoneNo: null };

  // Fetch data from the API when the component loads
  async componentWillLoad() {
    try {
      const contacts = await contactService.getContacts();
      this.data = contacts;
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  }

  // Edit and Delete functions
  editRow = (index: number) => {
    const rowData = this.data[index];
    this.formData = { ...rowData };
    this.currentRowIndex = index;
    this.toggleModal();
  };

  deleteRow = (index: number) => {
    const confirmation = window.confirm('Are you sure you want to delete this record?');
    if (confirmation) {
      const updatedData = this.data.filter((_, i) => i !== index);
      this.data = updatedData;
    }
  };

  // Form submit to create or update a record
  handleSubmit = async () => {
    const { fname, lname, phoneNo } = this.formData;

    // Validate form data
    if (!fname || !lname || !phoneNo) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      if (this.currentRowIndex === -1) {
        // Create new contact via API
        await contactService.createContact({
          id: 0,
          fname,
          lname,
          phoneNo,
        });
        // Refresh the data from the API
        this.data = await contactService.getContacts();
      }

      this.toggleModal(); // Close modal
      this.resetForm(); // Reset form data
    } catch (error) {
      console.error('Error while submitting the form:', error);
      alert('Failed to save the contact. Please try again.');
    }
  };

  resetForm = () => {
    this.formData = { fname: '', lname: '', phoneNo: null };
    this.currentRowIndex = -1;
  };

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    return this.data.slice(startIndex, startIndex + this.rowsPerPage);
  }

  nextPage = () => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  };

  prevPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  };

  get totalPages() {
    return Math.ceil(this.data.length / this.rowsPerPage);
  }

  toggleModal = () => {
    this.showModal = !this.showModal;
  };

  render() {
    return (
      <div id="body">
        <div class="create-btn-container">
          <button class="but" onClick={this.toggleModal}>
            Create Contact
          </button>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.paginatedData.map((row, index) => (
                <tr key={index}>
                  <td>{row.fname}</td>
                  <td>{row.lname}</td>
                  <td>{row.phoneNo}</td>
                  <td>
                    <button onClick={() => this.editRow(index)} class="edit-btn">Edit</button>
                    <button onClick={() => this.deleteRow(index)} class="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div class="pagination">
            <button onClick={this.prevPage} disabled={this.currentPage === 1}>
              Previous
            </button>
            <span>{`Page ${this.currentPage} of ${this.totalPages}`}</span>
            <button onClick={this.nextPage} disabled={this.currentPage === this.totalPages}>
              Next
            </button>
          </div>
        </div>
        {this.showModal && (
          <div id="overlay">
            <div class="dialog">
              <h2>{this.currentRowIndex === -1 ? 'Create Contact' : 'Edit Contact'}</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={this.formData.fname}
                  onInput={(e) => (this.formData.fname = (e.target as HTMLInputElement).value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={this.formData.lname}
                  onInput={(e) => (this.formData.lname = (e.target as HTMLInputElement).value)}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={this.formData.phoneNo || ''}
                  onInput={(e) => (this.formData.phoneNo = Number((e.target as HTMLInputElement).value))}
                />
                <div class="modal-actions">
                  <button type="button" onClick={this.handleSubmit} class="but">
                    {this.currentRowIndex === -1 ? 'Create' : 'Save'}
                  </button>
                  <button type="button" onClick={this.toggleModal} class="close">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}
