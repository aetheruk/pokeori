import { describe, expect, test } from 'bun:test'
import {
  MAX_PENDING_FRIEND_REQUESTS,
  planFriendship,
  type SocialUser,
} from '@/utilities/trainers/friendship'

const pending = {
  id: 'request',
  from: 'sender',
  to: 'receiver',
  status: 'pending' as const,
  createdAt: '2026-09-07',
}
const sender: SocialUser = {
  id: 'sender',
  friends: [],
  friendRequests: [pending],
}
const receiver: SocialUser = {
  id: 'receiver',
  friends: [],
  friendRequests: [pending],
}

describe('bilateral friendship changes', () => {
  test('accept adds each member once and an accepted request cannot restore a removed friendship', () => {
    const first = planFriendship(receiver, sender, 'accept', pending.id)
    expect(first.success).toBe(true)
    if (!first.success) throw new Error('Expected acceptance')
    expect(first.actor.friends).toEqual(['sender'])
    expect(first.other.friends).toEqual(['receiver'])
    const removed = planFriendship(
      { id: receiver.id, ...first.actor },
      { id: sender.id, ...first.other },
      'remove',
      sender.id,
    )
    if (!removed.success) throw new Error('Expected removal')
    expect(removed.actor.friends).toEqual([])
    expect(removed.other.friends).toEqual([])
    expect(
      planFriendship(
        { id: receiver.id, ...removed.actor },
        { id: sender.id, ...removed.other },
        'accept',
        pending.id,
      ).success,
    ).toBe(false)
  })

  test('sender cannot accept their own outgoing request and unrelated requests cannot be used', () => {
    expect(planFriendship(sender, receiver, 'accept', pending.id).success).toBe(
      false,
    )
    expect(
      planFriendship(receiver, { id: 'stranger' }, 'accept', pending.id)
        .success,
    ).toBe(false)
    expect(
      planFriendship(
        receiver,
        { ...sender, friendRequests: [] },
        'accept',
        pending.id,
      ).success,
    ).toBe(false)
  })

  test('both eligibility checks happen before a mutation plan is produced', () => {
    for (const operation of ['send', 'accept', 'reject', 'remove'] as const) {
      expect(
        planFriendship(
          receiver,
          { ...sender, kidMode: true },
          operation,
          pending.id,
        ).success,
      ).toBe(false)
      expect(
        planFriendship(
          { ...receiver, kidMode: true },
          sender,
          operation,
          pending.id,
        ).success,
      ).toBe(false)
    }
    expect(receiver.friends).toEqual([])
    expect(sender.friendRequests).toEqual([pending])
  })

  test('sending refuses pending requests on either side and caps pending history', () => {
    expect(
      planFriendship({ id: sender.id }, receiver, 'send', 'new').success,
    ).toBe(false)
    const full = Array.from(
      { length: MAX_PENDING_FRIEND_REQUESTS },
      (_, index) => ({ ...pending, id: String(index), from: `other-${index}` }),
    )
    expect(
      planFriendship(
        { id: sender.id },
        { id: receiver.id, friendRequests: full },
        'send',
        'new',
      ).success,
    ).toBe(false)
  })

  test('reject removes both copies and acceptance preserves unrelated relationships', () => {
    const rejected = planFriendship(receiver, sender, 'reject', pending.id)
    if (!rejected.success) throw new Error('Expected rejection')
    expect(rejected.actor.friendRequests).toEqual([])
    expect(rejected.other.friendRequests).toEqual([])
    const accepted = planFriendship(
      { ...receiver, friends: ['existing', 'existing'] },
      sender,
      'accept',
      pending.id,
    )
    if (!accepted.success) throw new Error('Expected acceptance')
    expect(accepted.actor.friends).toEqual(['existing', 'sender'])
  })
})
