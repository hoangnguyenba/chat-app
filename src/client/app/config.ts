import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface AppConfig {
  apiEndpoint: string;
  title: string;
}

export const CHAT_APP_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost:3100/',
  title: 'Chat App'
};
