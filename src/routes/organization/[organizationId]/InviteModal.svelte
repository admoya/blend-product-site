<script lang="ts">
  import { validate } from 'email-validator';
  import Modal from '../../../lib/components/Modal.svelte';
  import type { ValidationRequestBody } from './invites/validation/+server';
  import { invalidateAll } from '$app/navigation';
  export let showModal: boolean;
  export let organization: Database.Organization | null;
  export let orgId: string;
  $: numSeatsUsed = Object.keys({ ...organization?.private.members, ...organization?.private.invites }).length;
  $: availableSeats = (organization?.locked.seats || 0) - numSeatsUsed;

  let newMembers: Database.Invite.Validation[] = [];
  let inputMember: Database.Invite.Validation = { email: '' };
  let requestProcessing = false;

  let error = '';

  const handleEmailInput = () => {
    parseEmails();
    validateMembers();
  };

  const handleSubmit = async () => {
    requestProcessing = true;
    const response = await fetch(`/organization/${orgId}/invites`, {
      method: 'POST',
      body: JSON.stringify(newMembers),
    });
    if (response.ok) {
      newMembers = [];
      showModal = false;
      invalidateAll();
    } else {
      error = 'Failed to invite new members. Please try again later.';
    }
    requestProcessing = false;
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
  };

  const validateMembers = async () => {
    requestProcessing = true;
    const body: ValidationRequestBody = newMembers;
    const response = await fetch(`/organization/${orgId}/invites/validation`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (response.ok) {
      newMembers = await response.json();
    }
    requestProcessing = false;
  };

  const removeMember = (member: Database.Invite.Validation) => {
    newMembers = newMembers.filter((m) => m !== member);
  };

  $: disableSubmit = requestProcessing || newMembers.length === 0 || !!newMembers.find(({ error, validated }) => error || !validated);
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
              disabled={requestProcessing}
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
    {#if error}
      <p style="color: red">{error}</p>
    {/if}
    <div class="row flex-around flex-wrap">
      <button class="btn btn-green" on:click={handleSubmit} disabled={disableSubmit}>Submit</button>
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
