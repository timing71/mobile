import { ConnectionService, Service, ServiceDefinition, mapServiceProvider } from '@timing71/common';
import uuid from 'react-native-uuid';

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
    return new WebSocket(url, protocols);
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
