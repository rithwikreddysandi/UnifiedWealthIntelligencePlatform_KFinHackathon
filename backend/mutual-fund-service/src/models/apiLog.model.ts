export interface ApiLog {

  id: string;

  server_name: string;

  endpoint: string;

  request_method?: string;

  status_code?: number;

  response_time?: number;

  error_message?: string;

  created_at?: Date;
}



export interface CreateApiLogDTO {

  server_name: string;

  endpoint: string;

  request_method?: string;

  status_code?: number;

  response_time?: number;

  error_message?: string;
}



export interface ApiLogDetails {

  id: string;

  server_name: string;

  endpoint: string;

  request_method?: string;

  status_code?: number;

  response_time?: number;

  error_message?: string;

  created_at?: Date;
}



export interface ApiLogSummary {

  total_requests: number;

  successful_requests: number;

  failed_requests: number;

  average_response_time: number;
}



export interface EndpointAnalytics {

  endpoint: string;

  total_hits: number;

  average_response_time: number;

  success_count: number;

  failure_count: number;
}



export interface ErrorAnalytics {

  endpoint: string;

  status_code: number;

  error_message?: string;

  total_occurrences: number;
}