<script lang="ts">
  import { validate } from 'email-validator';
  import Modal from '../../../lib/components/Modal.svelte';
  import type { ValidationRequestBody } from '../validateNewMembers/+server';
  export let showModal: boolean;
  export let organization: Database.Organization | null;
  export let orgId: string;
  const members = organization?.private?.members || {};

  $: availableSeats = (organization?.locked.seats || 0) - Object.keys(members).length;

  let newMembers: Database.Organization.NewMember[] = [];
  let inputMember: Database.Organization.NewMember = { email: '' };
  let validatingMembers = false;

  const handleEmailInput = () => {
    parseEmails();
    validateMembers();
  };

  const parseEmails = () => {
    if (inputMember.email) {
      const newAdditions = inputMember.email
        .split(/;|,/)
        .filter((email) => !newMembers.find((nm) => nm.email === email))
        .map((email) => {
          const cleanedEmail = email.trim();
          let status = 'None';
          let error = false;
          if (!validate(cleanedEmail)) {
            status = 'Invalid Email';
            error = true;
          }
          return {
            email: cleanedEmail,
            status,
            error,
            validated: false,
          };
        });
      newMembers = [...newMembers, ...newAdditions];
      inputMember = { email: '' };
    }
    console.log(newMembers);
  };

  const validateMembers = async () => {
    validatingMembers = true;
    const body: ValidationRequestBody = { newMembers, orgId };
    const response = await fetch('validateNewMembers', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (response.ok) {
      newMembers = await response.json();
    }
    validatingMembers = false;
  };

  const removeMember = (member: Database.Organization.NewMember) => {
    newMembers = newMembers.filter((m) => m !== member);
  };

  $: disableSubmit = validatingMembers || newMembers.length === 0 || !!newMembers.find(({ error, validated }) => error || !validated);
</script>

<Modal bind:showModal>
  <h3 slot="header">Add Members</h3>
  <p>Enter up to {availableSeats} email addresses and click the "validate" button below.</p>
  <p>You may enter multiple emails at once seperated by a comma. They will be split up automatically.</p>
  <table>
    <tr>
      <th class="email">Email</th>
      <th class="name">Name</th>
      <th class="status">Status</th>
      <th class="actions">Actions</th>
    </tr>
    {#each newMembers as newMember (newMember.email)}
      <tr>
        <td>{newMember.email}</td>
        <td><em>{newMember.name || ''}</em></td>
        <td style={`color: ${newMember.error ? 'red' : ''}`}><em>{newMember.status}</em></td>
        <td><button class="btn btn-red btn-small" on:click={() => removeMember(newMember)}>Remove</button></td>
      </tr>
    {/each}
    <tr>
      <td>
        <form on:submit|preventDefault={handleEmailInput}>
          <div class="row">
            <input
              type="email"
              multiple
              style="width: 100%;"
              placeholder="person1@example.com, person2@example.com..."
              disabled={validatingMembers}
              bind:value={inputMember.email} />
            <button type="submit" class="btn btn-gray btn-small" style="margin: 0;">Add</button>
          </div>
        </form>
      </td>
    </tr>
  </table>
  <div slot="footer">
    {#if newMembers.find(({ error }) => error)}
      <p style="color: red">Please correct the error(s) above</p>
    {/if}
    {#if newMembers.length > availableSeats}
      <p style="color: red">Too many invitations added. Please remove {newMembers.length - availableSeats}.</p>
    {/if}
    <div class="row flex-around flex-wrap">
      <button class="btn btn-green" disabled={disableSubmit}>Submit</button>
    </div>
  </div>
</Modal>

<style>
  table {
    width: 100%;
    table-layout: fixed;
  }

  td {
    word-wrap: break-word;
  }

  th.email {
    width: 40%;
  }

  th.name,
  th.status,
  th.actions {
    width: 20%;
  }
</style>
