import { LISTMONK_API_URL, LISTMONK_PASSWORD, LISTMONK_USER } from '$env/static/private';

const AUTH_HEADER = `Basic ${btoa(`${LISTMONK_USER}:${LISTMONK_PASSWORD}`)}`;

interface DeckInviteData {
  sender: string;
  deckName: string;
  shareId: string;
}
export const sendDeckShareEmail = async (
  recipientEmail: string,
  recipientName: string | undefined,
  { sender, deckName, shareId }: DeckInviteData,
) => {
  console.log(`Sending deck share email for shareId ${shareId}`);
  console.log(`Creating subscriber for recipient ${recipientEmail}, if necessary.`);
  console.log(LISTMONK_API_URL);
  const subscriberCreateResponse = await fetch(`${LISTMONK_API_URL}/subscribers`, {
    method: 'POST',
    headers: {
      Authorization: AUTH_HEADER,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: recipientEmail,
      name: recipientName ?? recipientEmail,
      status: 'enabled',
      lists: [17],
    }),
  });
  if (subscriberCreateResponse.status === 409) {
    console.log(`${recipientEmail} is already an existing subscriber`);
  } else if (subscriberCreateResponse.ok) {
    console.log(`Created subscriber for ${recipientEmail}`);
  } else {
    throw new Error(`Error creating subscriber for ${recipientEmail}: ${subscriberCreateResponse.status}: ${await subscriberCreateResponse.text()}`);
  }

  console.log(`Sending deck share email to ${recipientEmail}`);
  const emailResponse = await fetch(`${LISTMONK_API_URL}/tx`, {
    method: 'POST',
    headers: {
      Authorization: AUTH_HEADER,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subscriber_email: recipientEmail,
      template_id: 13,
      data: {
        sender,
        deckName,
        acceptLink: `https://blendreading.com/deckShare/${shareId}`,
      },
    }),
  });
  if (!emailResponse.ok) {
    throw new Error(`Error sending email to ${recipientEmail}: ${emailResponse.status}: ${await emailResponse.text()}`);
  }
  console.log(`Email sent to ${recipientEmail}`);
};

interface PlaylistInviteData {
  sender: string;
  playlistName: string;
  shareId: string;
}
export const sendPlaylistShareEmail = async (
  recipientEmail: string,
  recipientName: string | undefined,
  { sender, playlistName, shareId }: PlaylistInviteData,
) => {
  console.log(`Sending playlist share email for shareId ${shareId}`);
  console.log(`Creating subscriber for recipient ${recipientEmail}, if necessary.`);
  console.log(LISTMONK_API_URL);
  const subscriberCreateResponse = await fetch(`${LISTMONK_API_URL}/subscribers`, {
    method: 'POST',
    headers: {
      Authorization: AUTH_HEADER,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: recipientEmail,
      name: recipientName ?? recipientEmail,
      status: 'enabled',
      lists: [17],
    }),
  });
  if (subscriberCreateResponse.status === 409) {
    console.log(`${recipientEmail} is already an existing subscriber`);
  } else if (subscriberCreateResponse.ok) {
    console.log(`Created subscriber for ${recipientEmail}`);
  } else {
    throw new Error(`Error creating subscriber for ${recipientEmail}: ${subscriberCreateResponse.status}: ${await subscriberCreateResponse.text()}`);
  }
  console.log(`Sending playlist share email to ${recipientEmail}`);
  const emailResponse = await fetch(`${LISTMONK_API_URL}/tx`, {
    method: 'POST',
    headers: {
      Authorization: AUTH_HEADER,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subscriber_email: recipientEmail,
      template_id: 16,
      data: {
        sender,
        playlistName,
        acceptLink: `https://blendreading.com/playlistShare/${shareId}`,
      },
    }),
  });
  if (!emailResponse.ok) {
    throw new Error(`Error sending email to ${recipientEmail}: ${emailResponse.status}: ${await emailResponse.text()}`);
  }
  console.log(`Email sent to ${recipientEmail}`);
};
