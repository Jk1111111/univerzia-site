import { media } from "./media";

export type ProjectCategory = "Robotics" | "AI" | "IoT" | "Coding" | "Sustainability";

export type Project = {
  slug: string;
  title: string;
  categories: ProjectCategory[];
  description: string;
  gradeLevel: string;
  icon: string;
  accent: "electric" | "cyan" | "violet" | "green" | "amber" | "orange";
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "smart-agriculture",
    title: "Smart Agriculture",
    categories: ["IoT", "Sustainability"],
    description: "A sensor-based irrigation system that monitors soil moisture and waters crops automatically. Students learned to balance real farm data with hardware limitations.",
    gradeLevel: "Grades 6-8",
    icon: "sprout",
    accent: "green",
    image: media.projectPhotos.smartIrrigation,
  },
  {
    slug: "smart-traffic",
    title: "Smart Traffic",
    categories: ["IoT", "AI"],
    description: "A model traffic system that adjusts signal timing based on live vehicle density, combining sensor input with simple predictive logic.",
    gradeLevel: "Grades 9-10",
    icon: "traffic-cone",
    accent: "orange",
    image: media.projectPhotos.smartTraffic,
  },
  {
    slug: "ai-vision",
    title: "AI Vision",
    categories: ["AI", "Coding"],
    description: "An image-recognition tool trained to sort recyclable waste by material type, exploring dataset labeling and model accuracy trade-offs.",
    gradeLevel: "Grades 9-10",
    icon: "scan-eye",
    accent: "violet",
    image: media.kidsCoding[1],
  },
  {
    slug: "smart-energy-monitor",
    title: "Smart Energy Monitor",
    categories: ["IoT", "Sustainability"],
    description: "A household energy tracker that flags high-consumption devices in real time, pairing circuit design with a simple dashboard interface.",
    gradeLevel: "Grades 7-9",
    icon: "zap",
    accent: "electric",
    image: media.projectPhotos.energyMeters,
  },
  {
    slug: "weather-station",
    title: "Weather Station",
    categories: ["IoT", "Robotics"],
    description: "A self-contained station measuring temperature, humidity and rainfall for the school campus, calibrated and logged over a full term.",
    gradeLevel: "Grades 6-8",
    icon: "cloud-sun",
    accent: "cyan",
    image: media.projectPhotos.weatherStation,
  },
  {
    slug: "waste-management",
    title: "Waste Management",
    categories: ["Robotics", "Sustainability"],
    description: "A sorting mechanism that separates waste using basic robotic arms and sensors, refined across three prototypes before it worked.",
    gradeLevel: "Grades 8-10",
    icon: "recycle",
    accent: "green",
    image: media.projectPhotos.recyclingFacility,
  },
  {
    slug: "assistive-technology",
    title: "Assistive Technology",
    categories: ["AI", "Coding"],
    description: "A voice-assisted device concept designed to help visually impaired users navigate indoor spaces, prioritizing usability alongside function.",
    gradeLevel: "Grades 10-12",
    icon: "ear",
    accent: "violet",
    image: media.projectPhotos.brailleDevice,
  },
  {
    slug: "school-safety-system",
    title: "School Safety System",
    categories: ["IoT", "Robotics"],
    description: "An entry-monitoring prototype using motion sensors and automated alerts for unauthorized access, built with privacy in mind.",
    gradeLevel: "Grades 9-11",
    icon: "shield-alert",
    accent: "electric",
    image: media.projectPhotos.securityCameras,
  },
];

export const projectFilters: Array<ProjectCategory | "All"> = ["All", "Robotics", "AI", "IoT", "Coding", "Sustainability"];
