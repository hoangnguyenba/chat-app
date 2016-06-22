import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface AppConfig {
  apiEndpoint: string;
}

export const CHAT_APP_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost:8080/'
};