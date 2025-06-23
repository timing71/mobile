import { ConnectionService, EventEmitter, Service, ServiceDefinition, mapServiceProvider } from '@timing71/common';
import uuid from 'react-native-uuid';

/**
 * Bridge between the regular WebSocket interface (onmessage etc) and the
 * EventEmitter-y one (on('message', () => {})) that are used fairly
 * interchangeably in different services.
 *
 * I should probably have done something about that before now...
 */
class WrappedWebsocket extends EventEmitter {

  private _ws: WebSocket;

  public onmessage?: (data: any) => void;
  public onopen?: (data: any) => void;
  public onclose?: (data: any) => void;

  constructor(url: string, protocols?: string[]) {
    super();
    this._ws = new WebSocket(url, protocols);
    this._ws.onmessage = this.makeHandler('message', 'onmessage');
    this._ws.onopen = this.makeHandler('open', 'onopen');
    this._ws.onclose = this.makeHandler('close', 'onclose');
  }

  makeHandler(wsEvent: string, localMethodName?: 'onmessage' | 'onopen' | 'onclose') {
    return (data: any) => {
      this.emit(wsEvent, data);
      if (localMethodName) {
        const localMethod = this[localMethodName];
        if (typeof(localMethod) === 'function') {
          localMethod(data);
        }
      }

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
