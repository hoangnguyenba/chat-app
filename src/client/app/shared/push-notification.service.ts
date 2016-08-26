declare var Notification: any;

export interface INotificationConfig {
  title?: string;
  body?: string;
  icon?: string;
  sound?: string;
  data?: any;
  tag?: string;
  dir?: string;
  lang?: string;
  renotify?: boolean;
  sticky?: boolean;
  vibrate?: Array<number>;
  noscreen?: boolean;
  silent?: boolean;
  closeDelay?: number;
}

export class NotificationConfig {

  public title: string = 'Notification';
  public body: string = '';
  public icon: string = '/favicon.ico';
  public sound: string;
  public data: any;
  public tag: string;
  public dir: string = 'auto';
  public lang: string = 'en-US';
  public renotify: boolean = false;
  public sticky: boolean = false;
  public vibrate: Array<number>;
  public noscreen: boolean = false;
  public silent: boolean = true;
  public closeDelay: number = 0;

  constructor(config:any={}) {
    this.title = config.title || this.title;
    this.body = config.body || this.body;
    this.icon = config.icon || this.icon;
    this.sound = config.sound || this.sound;
    this.data = config.data || this.data;
    this.tag = config.tag || this.tag;
    this.dir = config.dir || this.dir;
    this.lang = config.lang || this.lang;
    this.renotify = config.renotify || this.renotify;
    this.sticky = config.sticky || this.sticky;
    this.vibrate = config.vibrate || this.vibrate;
    this.noscreen = config.noscreen || this.noscreen;
    this.silent = config.silent || this.silent;
    this.closeDelay = config.closeDelay || this.closeDelay;
  }

  getConfig(): INotificationConfig {
    return {
      title: this.title,
      body: this.body,
      icon: this.icon,
      sound: this.sound,
      data: this.data,
      tag: this.tag,
      dir: this.dir,
      lang: this.lang,
      renotify: this.renotify,
      sticky: this.sticky,
      vibrate: this.vibrate,
      noscreen: this.noscreen,
      silent: this.silent,
      closeDelay: this.closeDelay
    };
  }

  mergeConfig(config: INotificationConfig): INotificationConfig {
    return {
      title : config.title || this.title,
      body : config.body || this.body,
      icon : config.icon || this.icon,
      sound : config.sound || this.sound,
      data : this.data || config.data,
      tag : config.tag || this.tag,
      dir : config.dir || this.dir,
      lang : config.lang || this.lang,
      renotify : config.renotify || this.renotify,
      sticky : config.sticky || this.sticky,
      vibrate : config.vibrate || this.vibrate,
      noscreen : config.noscreen || this.noscreen,
      silent : config.silent || this.silent,
      closeDelay : config.closeDelay || this.closeDelay
    };
  }
}

export class PushNotificationService {

  public static get DEFAULT():string { return 'default'; }
  public static get GRANTED():string { return 'granted'; }
  public static get DENIED():string { return 'denied'; }

  private static _isCompatibility: boolean = false;
  private static _isPermissionGranted: boolean = false;

  public onShow: Function = null;
  public onClose: Function = null;
  public onError: Function = null;
  public onClick: Function = null;

  private _config: INotificationConfig;

  public static get isCompatibility(): boolean {
    return PushNotificationService._isCompatibility;
  }

  public static get isPermissionGranted(): boolean {
    return PushNotificationService._isPermissionGranted;
  }

  public static closeAll (): void {
    Notification.close();
  }

  constructor(notificationConfig: NotificationConfig) {
      if (!this.checkCompatibility()) {
        console.log('Notification API not available in this browser.');
      } else {
        PushNotificationService._isCompatibility = true;

        // Assign options
        this._config = notificationConfig.getConfig();

        this.requestPermission((permission: string) => {
            if (permission === PushNotificationService.GRANTED) {
                PushNotificationService._isPermissionGranted = true;
            }
        });
      }
  }

  public checkCompatibility () {
    return !!('Notification' in window);
  }

  public requestPermission (callback: Function) {
    return Notification.requestPermission(callback);
  }

  public create (config?: NotificationConfig) {
    if (PushNotificationService.isCompatibility && PushNotificationService.isPermissionGranted) {

      // Need merge options here
      var tempConfig: INotificationConfig;
      if(config) {
        tempConfig = config.mergeConfig(this._config);
      } else {
        tempConfig = this._config;
      }
      let notification = new Notification(tempConfig.title, {
        dir: tempConfig.dir,
        lang: tempConfig.lang,
        data: tempConfig.data,
        tag: tempConfig.tag,
        body: tempConfig.body,
        icon: tempConfig.icon,
        silent: tempConfig.silent,
        sound: tempConfig.sound,
        renotify: tempConfig.renotify,
        sticky: tempConfig.sticky,
        vibrate: tempConfig.vibrate,
        noscreen: tempConfig.noscreen
      });

      this.attachEventHandlers(notification);
      this.close(notification);

      return notification;
    }
  }

  public text(text: string): void {
    this.create(new NotificationConfig({
      body: text
    }));
  }

  public close (notification: any): void {
    if (this._config.closeDelay) {
      setTimeout(() => {
        notification.close();
      }, this._config.closeDelay);
    } else {
      notification.close();
    }
  }

  attachEventHandlers (notification: any): void {
    notification.onshow = () => this.onShow;

    notification.onclick = (event: Event) => this.onClick;

    notification.onerror = () => this.onError;

    notification.onclose = () => this.onClose;
  }

}
