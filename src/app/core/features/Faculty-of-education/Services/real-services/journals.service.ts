/**
 * Journals Service
 * Handles all API operations related to journals
 * @version 1.0
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
 * Journal Attachment Interface
 */
export interface JournalAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  journalId: string;
}

/**
 * Journal Interface
 */
export interface Journal {
  id: string;
  pubishedDate: string;
  title: string;
  description: string;
  journalAttachments: JournalAttachment[];
}

@Injectable({
  providedIn: 'root',
})
export class JournalsService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get journals with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated journals response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<Journal>> {
    return this.http
      .post<PaginatedResponse<Journal>>(API_ENDPOINTS.JOURNALS.GET_PAGED, data)
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
   * Get journal by ID
   * @param id Journal unique identifier
   * @returns Observable of journal details
   */
  getById(id: string): Observable<ApiResponse<Journal>> {
    return this.http
      .get<ApiResponse<Journal>>(API_ENDPOINTS.JOURNALS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all journals
   * @returns Observable of all journals
   */
  getAllJournals(): Observable<ApiResponse<Journal[]>> {
    return this.http
      .get<ApiResponse<Journal[]>>(API_ENDPOINTS.JOURNALS.GET_ALL)
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
   * @deprecated Use getAllJournals() instead
   */
  get journals(): Observable<ApiResponse<Journal[]>> {
    return this.getAllJournals();
  }
}
