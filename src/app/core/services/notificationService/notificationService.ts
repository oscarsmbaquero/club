import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService: MessageService) { }

  /**
   * Función general para mostrar notificaciones
   */
  showNotification(severity: 'success' | 'error' | 'info' | 'warn', detail: string, summary: string = ''): void {
    this.messageService.add({
      severity,
      summary,
      detail
    });
  }
}
