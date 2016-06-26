declare var Notification: any;

export class PushNotificationService {

  public static get DEFAULT():string { return "default"; }
  public static get GRANTED():string { return "granted"; }
  public static get DENIED():string { return "denied"; }

  private static _isCompatibility: boolean = false;
  private static _isPermissionGranted: boolean = false;

  public title: string = "Notification";
  public body: string = "";
  public icon: string;
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

  public onShow: Function = null;
  public onClose: Function = null;
  public onError: Function = null;
  public onClick: Function = null;

  constructor(title: string) {
      if (!this.checkCompatibility()) {
        console.log('Notification API not available in this browser.');
      } else {
        PushNotificationService._isCompatibility = true;

        // Assign options
        this.title = title;

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

  public static get isCompatibility(): boolean { 
    return PushNotificationService._isCompatibility;
  }

  public static get isPermissionGranted(): boolean {
    return PushNotificationService._isPermissionGranted;
  }

  public requestPermission (callback: Function) {
    return Notification.requestPermission(callback);
  }

  public create () {
    if (PushNotificationService.isCompatibility && PushNotificationService.isPermissionGranted) {
      let notification = new Notification(this.title, {
        dir: this.dir,
        lang: this.lang,
        data: this.data,
        tag: this.tag,
        body: this.body,
        icon: this.icon,
        silent: this.silent,
        sound: this.sound,
        renotify: this.renotify,
        sticky: this.sticky,
        vibrate: this.vibrate,
        noscreen: this.noscreen
      });

      this.attachEventHandlers(notification);
      this.close(notification);

      return notification;
    }
  }

  public close (notification: any): void {
    if (this.closeDelay) {
      setTimeout(() => {
        notification.close();
      }, this.closeDelay);
    } else {
      notification.close();
    }
  }

  public static closeAll (): void {
    Notification.close();
  }

  attachEventHandlers (notification: any): void {
    notification.onshow = () => this.onShow;

    notification.onclick = (event: Event) => this.onClick;

    notification.onerror = () => this.onError;

    notification.onclose = () => this.onClose;
  }

}