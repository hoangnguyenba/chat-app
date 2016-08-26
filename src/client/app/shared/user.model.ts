export class User {

  public static get USER_STATUS_OFFLINE():number { return 0; }
  public static get USER_STATUS_ONLINE():number { return 1; }
  public static get USER_STATUS_AWAY():number { return 2; }
  public static get USER_STATUS_BUSY():number { return 3; }

  public static get USER_TYPE_ORDINARY():number { return 0; }
  public static get USER_TYPE_MANAGER():number { return 1; }

  id: string;
  name:  string;
  logo: string;
  status: number;
  type: number;

  constructor(obj?: any) {
    this.id          = obj && obj.id                || null;
    this.name          = obj && obj.name            || null;
    this.status       = obj && obj.status           || User.USER_STATUS_OFFLINE;
    this.type       = obj && obj.type               || User.USER_TYPE_ORDINARY;
    this.logo       = obj && obj.logo               || window.location.origin + '/assets/billfold-admin.png';
  }
}
