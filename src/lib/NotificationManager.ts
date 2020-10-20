export abstract class NotificationManager {
  private serverURL: string
  
  constructor(serverURL: string) {
    this.serverURL = serverURL
  }

  abstract sendNotification(notf: any)
}