export interface VisionMissionItem {
  id: string;
  title: string;
  // content: string;
  icon: string;
  gradient: string;
}

export interface VisionMission {
  vision: string;
  mission: string;
  objectives: string[];
}

export interface ObjectiveItem {
  id: number;
  text: string;
  icon: string;
}