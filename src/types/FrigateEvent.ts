export interface FrigateEvent {
  type: 'new' | 'update' | 'end';
  before: Before;
  after: After;
}

export interface Before {
  id: string;
  camera: string;
  frame_time: number;
  snapshot_time: number;
  label: string;
  sub_label: any;
  top_score: number;
  false_positive: boolean;
  start_time: number;
  end_time: any;
  score: number;
  box: number[];
  area: number;
  ratio: number;
  region: number[];
  current_zones: string[];
  entered_zones: string[];
  thumbnail: any;
  has_snapshot: boolean;
  has_clip: boolean;
  stationary: boolean;
  motionless_count: number;
  position_changes: number;
}

export interface After {
  id: string;
  camera: string;
  frame_time: number;
  snapshot_time: number;
  label: string;
  sub_label: any;
  top_score: number;
  false_positive: boolean;
  start_time: number;
  end_time: any;
  score: number;
  box: number[];
  area: number;
  ratio: number;
  region: number[];
  current_zones: string[];
  entered_zones: string[];
  thumbnail: any;
  has_snapshot: boolean;
  has_clip: boolean;
  stationary: boolean;
  motionless_count: number;
  position_changes: number;
}
