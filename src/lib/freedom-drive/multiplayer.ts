import type { FreedomDriveNetworkState } from "@/lib/freedom-drive/types";

/** Multiplayer channel stub · WebSocket / Supabase Realtime ready */
export class FreedomDriveMultiplayerChannel {
  private listeners = new Set<(states: FreedomDriveNetworkState[]) => void>();
  private remoteStates = new Map<string, FreedomDriveNetworkState>();

  connect(roomId: string) {
    void roomId;
    return { ok: true as const, mode: "solo-preview" as const };
  }

  publishLocalState(state: FreedomDriveNetworkState) {
    this.remoteStates.set(state.playerId, state);
    this.emit();
  }

  subscribe(listener: (states: FreedomDriveNetworkState[]) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  disconnect() {
    this.remoteStates.clear();
    this.listeners.clear();
  }

  private emit() {
    const states = [...this.remoteStates.values()];
    this.listeners.forEach((fn) => fn(states));
  }
}

export const freedomDriveMultiplayer = new FreedomDriveMultiplayerChannel();
