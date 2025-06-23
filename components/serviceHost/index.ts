import { ConnectionService, Service, ServiceDefinition, mapServiceProvider } from '@timing71/common';
import uuid from 'react-native-uuid';

class WrappedWebsocket {

  private _ws: WebSocket

  constructor(url: string, protocols?: string[]) {
    this._ws = new WebSocket(url, protocols);
  }

  on(event: string, handler: () => void) {
    if (event === 'message') {
      this._ws.onmessage = handler;
    }
    else if (event === 'open') {
      this._ws.onopen = handler;
    }
    else if (event === 'close') {
      this._ws.onclose = handler;
    }
  }

  send(data: any) {
    this._ws.send(data);
  }

  close() {
    this._ws.close();
  }
}

export const connectionService: ConnectionService = {
  fetch: async (url: string, { returnHeaders=false, ...options }={}) => {
    const response = await fetch(url, options);
    const text = await response.text();
    if (returnHeaders) {
      return [text, Object.fromEntries(response.headers.entries())];
    }
    return text;
  },
  createWebsocket: (url: string, { protocols=[] }={}) => {
    return new WrappedWebsocket(url, protocols);
  },
  createDOMParser: () => new DOMParser()
};

export const createServiceForURL = (url: string): Service | null => {
  const serviceClass = mapServiceProvider(url);
  if (serviceClass) {
    const serviceSpec: ServiceDefinition = {
      source: url,
      startTime: Date.now() / 1000,
      uuid: uuid.v4()
    }

    const service = new serviceClass(serviceSpec);
    return service;
  }
  return null;
}
