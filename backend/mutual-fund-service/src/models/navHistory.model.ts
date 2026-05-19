export interface NavHistory {

  id: string;

  fund_id: string;

  nav: number;

  nav_date: Date;

  created_at?: Date;
}



export interface CreateNavHistoryDTO {

  fund_id: string;

  nav: number;

  nav_date: Date;
}



export interface UpdateNavHistoryDTO {

  nav?: number;

  nav_date?: Date;
}



export interface NavTrend {

  fund_id: string;

  fund_name: string;

  latest_nav: number;

  previous_nav: number;

  change: number;

  change_percentage: number;
}