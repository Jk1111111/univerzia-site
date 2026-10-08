// Centralized real-photo manifest (temporary/dev imagery, royalty-free via Unsplash).
// Swap any URL here — or better, drop a local file in public/images and point to it —
// to replace a photo site-wide without touching component code.
// All IDs verified to resolve at build time; sourced from Unsplash's free (non-"plus") library.
// Student-facing photos (hero/heroAlt/scienceLab/teacherTraining/kidsCoding) were deliberately
// sourced to show real Indian classrooms and students — circuitMacro, headshots (named team
// bios) and retroRobotToy are prop/portrait shots and were left as-is.

function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
}

export const media = {
  hero: unsplash("1719159381981-1327b22aff9b"), // Indian students at computers, CAD/design software on screen
  heroAlt: unsplash("1719159381916-062fa9f435a6"), // Indian smart classroom, students at desks with projector

  scienceLab: [
    unsplash("1719159381916-062fa9f435a6"), // Indian smart classroom
    unsplash("1709290749293-c6152a187b14"), // Indian teacher instructing a full classroom, West Bengal
    unsplash("1692269725836-fbd72e98883f"), // Indian classroom, students at desks
    unsplash("1692269725911-87697c558be1"), // two Indian students studying at a desk
  ],

  teacherTraining: [
    unsplash("1709290749293-c6152a187b14"), // Indian teacher leading a classroom session
    unsplash("1569173675610-42c361a86e37"), // group of Indian students, school uniforms
    unsplash("1719159381916-062fa9f435a6"), // Indian smart classroom
    unsplash("1692269725836-fbd72e98883f"), // Indian classroom
  ],

  kidsCoding: [
    unsplash("1719159381981-1327b22aff9b"), // Indian students at computers running design software
    unsplash("1692269725911-87697c558be1"), // Indian student studying closeup
    unsplash("1719159381981-1327b22aff9b"), // Indian computer lab (robot-build hero tile)
    unsplash("1719159381916-062fa9f435a6"), // Indian smart classroom
    unsplash("1569173675610-42c361a86e37"), // group of Indian students
    unsplash("1692269725836-fbd72e98883f"), // Indian classroom
  ],

  circuitMacro: [
    unsplash("1518770660439-4636190af475"), // dense circuit board macro
    unsplash("1580584126903-c17d41830450"), // red-lit circuit board macro
    unsplash("1562408590-e32931084e23"),
    unsplash("1517077304055-6e89abbf09b0"),
  ],

  headshots: [
    unsplash("1507003211169-0a1dd7228f2d", 400),
    unsplash("1500648767791-00dcc994a43e", 400),
    unsplash("1494790108377-be9c29b29330", 400),
    unsplash("1609436132311-e4b0c9370469", 400),
    unsplash("1600878459138-e1123b37cb30", 400),
    unsplash("1701728667207-54b43dbdab97", 400),
  ],

  retroRobotToy: unsplash("1527430253228-e93688616381"),

  // Content-specific photos for the project showcase — each one is the
  // actual subject named in that project's description (a real traffic
  // light, a real sprinkler, a real weather station), not a reused generic
  // classroom/circuit shot standing in for six unrelated projects. Verified
  // by downloading and visually inspecting each before adding it here.
  projectPhotos: {
    smartTraffic: unsplash("1557404763-69708cd8b9ce"), // an actual lit traffic signal, red/amber
    smartIrrigation: unsplash("1701451194924-c587b45dc3e3"), // a garden sprinkler head actively watering
    weatherStation: unsplash("1650530224492-f5a8b6e77fae"), // a real rooftop weather station with anemometer + solar panel
    energyMeters: unsplash("1604177420682-0c840feb01de"), // a bank of real analog utility/electric meters
    recyclingFacility: unsplash("1717667745830-de42bb75a4fa"), // a real waste-sorting facility, excavator + recyclables
    brailleDevice: unsplash("1574887427561-d3d5d58c9273"), // hands using a real braille display/keyboard
    securityCameras: unsplash("1496368077930-c1e31b4e5b44"), // two real CCTV cameras mounted on a wall
  },

  // Real NASA "Blue Marble"-style Earth photograph — used in the footer's
  // STEM Adventure scene in place of a drawn/stylized planet. Custom crop
  // (not the shared unsplash() helper) because the source frame is a small
  // sphere on a black backdrop — a focal-point zoom crop is needed so the
  // sphere itself touches all four edges and no backdrop survives a
  // circular clip.
  earth: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.48&fp-z=1.75&w=400&h=400&q=80",
};

export type MediaKey = keyof typeof media;
