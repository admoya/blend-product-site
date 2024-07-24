import { LISTMONK_API_URL, LISTMONK_PASSWORD, LISTMONK_USER } from '$env/static/private';
import { ListmonkClient } from '@csma/toolbelt';

export const listmonkClient = new ListmonkClient(LISTMONK_API_URL, LISTMONK_USER, LISTMONK_PASSWORD);

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
  console.log(`Sending deck share email for shareId ${shareId} to ${recipientEmail}`);
  await listmonkClient.sendTransactionalEmail(
    {
      id: 13,
      recipientEmail,
      variables: { sender, deckName, acceptLink: `https://blendreading.com/deckShare/${shareId}` },
      associatedLists: [17],
    },
    { userDisplayName: recipientName },
  );
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
  console.log(`Sending playlist share email for shareId ${shareId} to ${recipientEmail}`);
  await listmonkClient.sendTransactionalEmail(
    {
      id: 16,
      recipientEmail,
      associatedLists: [17],
      variables: { sender, playlistName, acceptLink: `https://blendreading.com/playlistShare/${shareId}` },
    },
    { userDisplayName: recipientName },
  );
  console.log(`Email sent to ${recipientEmail}`);
};
