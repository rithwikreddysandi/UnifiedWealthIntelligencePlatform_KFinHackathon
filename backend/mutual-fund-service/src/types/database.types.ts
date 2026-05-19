/*
|--------------------------------------------------------------------------
| COMMON DATABASE TYPES
|--------------------------------------------------------------------------
*/



export interface PaginationQuery {

  page?: number;

  limit?: number;
}





export interface PaginationResult<T> {

  data: T[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}





export interface BaseEntity {

  id: string;

  created_at?: Date;

  updated_at?: Date;
}





/*
|--------------------------------------------------------------------------
| DATABASE RESPONSE TYPES
|--------------------------------------------------------------------------
*/



export interface DatabaseResponse<T> {

  success: boolean;

  data?: T;

  error?: any;
}





export interface QueryResult<T> {

  rows: T[];

  rowCount: number;
}





/*
|--------------------------------------------------------------------------
| FILTER TYPES
|--------------------------------------------------------------------------
*/



export interface DateRangeFilter {

  startDate?: Date;

  endDate?: Date;
}





export interface SortQuery {

  sortBy?: string;

  sortOrder?: "ASC" | "DESC";
}





/*
|--------------------------------------------------------------------------
| AUDIT TYPES
|--------------------------------------------------------------------------
*/



export interface AuditMetadata {

  created_by?: string;

  updated_by?: string;

  ip_address?: string;
}





/*
|--------------------------------------------------------------------------
| API LOG TYPES
|--------------------------------------------------------------------------
*/



export interface ApiMetrics {

  endpoint: string;

  request_count: number;

  average_response_time: number;

  error_count: number;
}





/*
|--------------------------------------------------------------------------
| FINANCIAL TYPES
|--------------------------------------------------------------------------
*/



export interface PortfolioSummary {

  investor_id: string;

  total_investment: number;

  current_value: number;

  total_returns: number;

  total_returns_percentage: number;
}





export interface NavData {

  fund_id: string;

  nav: number;

  nav_date: Date;
}





export interface SipExecutionResult {

  sip_id: string;

  transaction_id?: string;

  success: boolean;

  message: string;
}