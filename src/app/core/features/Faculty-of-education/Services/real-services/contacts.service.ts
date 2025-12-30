/**
 * Contacts Service
 * Handles all API operations related to contact information
 * @version 2.0
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, retry, timeout } from 'rxjs';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';
import { ApiResponse, PaginatedResponse } from '../../../../models/api.models';
import { PageRequest } from '../../model/real model/page-request.model';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { environment } from '../../../../../../environments/environment';

/**
 * Contact Interface
 * Represents contact information for the organization
 */
export interface Contact {
  id: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  youTube: string;
  whatsApp: string;
  mapLocation: string;
  webSite: string;
  fax: string;
}

/**
 * Social Media Link Interface
 * Used for displaying social media links in UI
 */
export interface SocialMediaLink {
  platform: string;
  url: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get  ts with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated contacts response
   * @example
   * ```typescript
   * this.contactsService.getPaged({
   *   pageNumber: 1,
   *   pageSize: 10,
   *   searchTerm: 'مركز'
   * }).subscribe(result => {
   *   console.log('Centers:', result.data);
   * });
   * ```
   */
  getPaged(data: any): Observable<any> {
    return this.http
      .post<any>(API_ENDPOINTS.CONTACTS.GET_PAGED, data, {
        headers: {
          'Content-Type': 'application/json-patch+json',
          Accept: 'text/plain',
        },
      })
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get contact details by ID
   * @param id contact unique identifier
   * @returns Observable of contact details
   * @example
   * ```typescript
   * this.contactsService.getById('123').subscribe(result => {
   *   console.log('contact:', result.data);
   * });
   * ```
   */
  getById(id: string): Observable<ApiResponse<any>> {
    return this.http
      .get<ApiResponse<any>>(API_ENDPOINTS.CONTACTS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all contacts
   * @returns Observable of all contacts
   * @example
   * ```typescript
   * this.contactsService.getAllContacts().subscribe(result => {
   *   console.log('All contacts:', result.data);
   * });
   * ```
   */
  getAllContacts(): Observable<ApiResponse<any[]>> {
    return this.http
      .get<ApiResponse<any[]>>(API_ENDPOINTS.CONTACTS.GET_ALL)
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Legacy method for backward compatibility
   * @deprecated Use getAllCenters() instead
   */
  get centers(): Observable<ApiResponse<any[]>> {
    return this.getAllContacts();
  }
}
