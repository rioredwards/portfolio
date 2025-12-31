export interface ParsedProjectContent {
  title: string;
  slogan?: string;
  description?: string;
  headerImage?: string;
  links: Array<{ text: string; url: string }>;
  tags: string[];
  madeWith: string[];
  features?: string;
  preview?: string;
  usage?: string;
  configure?: string;
  lessonsLearned?: string;
  reflection?: string;
  authors?: string;
  acknowledgements?: string;
  custom?: string;
}

export function parseProjectMarkdown(
  markdown: string,
  projectTitle: string,
): ParsedProjectContent {
  const lines = markdown.split("\n");
  const result: ParsedProjectContent = {
    title: projectTitle,
    links: [],
    tags: [],
    madeWith: [],
  };

  let currentSection = "";
  let sectionContent: string[] = [];
  let foundHeaderImage = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Skip empty lines at the start
    if (i < 3 && !trimmedLine) continue;

    // Extract links from line with bullet separator (Try • GitHub)
    if (
      trimmedLine.includes("•") &&
      trimmedLine.includes("[") &&
      trimmedLine.includes("](")
    ) {
      const linkMatches = trimmedLine.match(/\[([^\]]+)\]\(([^)]+)\)/g);
      if (linkMatches) {
        linkMatches.forEach((match) => {
          const textMatch = match.match(/\[([^\]]+)\]/);
          const urlMatch = match.match(/\(([^)]+)\)/);
          if (textMatch && urlMatch) {
            result.links.push({
              text: textMatch[1],
              url: urlMatch[1],
            });
          }
        });
      }
    }

    // Extract slogan (line with **bold** text, usually after title)
    if (
      trimmedLine.includes("**") &&
      !trimmedLine.startsWith("#") &&
      !trimmedLine.startsWith("!")
    ) {
      if (!result.slogan && trimmedLine.length < 100) {
        result.slogan = trimmedLine.replace(/\*\*/g, "");
      }
    }

    // Extract header image (first image reference)
    if (
      trimmedLine.startsWith("![") &&
      trimmedLine.includes("images/") &&
      !foundHeaderImage
    ) {
      const imageMatch = trimmedLine.match(/\(images\/([^)]+)\)/);
      if (imageMatch) {
        result.headerImage = `/work/images/${imageMatch[1]}`;
        foundHeaderImage = true;
      }
    }

    // Extract preview image
    if (trimmedLine.startsWith("![") && trimmedLine.match(/preview|gif/i)) {
      const imageMatch = trimmedLine.match(/\(images\/([^)]+)\)/);
      if (imageMatch) {
        result.preview = `/work/images/${imageMatch[1]}`;
      }
    }

    // Detect section headers
    if (trimmedLine.startsWith("## ")) {
      // Save previous section
      if (currentSection && sectionContent.length > 0) {
        const content = sectionContent.join("\n").trim();
        saveSection(currentSection, content, result);
      }

      // Start new section
      currentSection = trimmedLine.replace(/^##\s+/, "").trim();
      sectionContent = [];
    } else if (trimmedLine.startsWith("# ")) {
      // Main title - skip
      currentSection = "";
      sectionContent = [];
    } else if (currentSection) {
      // Add to current section
      sectionContent.push(line);
    } else if (
      i > 2 &&
      trimmedLine &&
      !trimmedLine.startsWith("!") &&
      !trimmedLine.includes("•")
    ) {
      // This is likely the description (after title, slogan, image, links)
      if (!result.description) {
        result.description = trimmedLine;
      } else if (trimmedLine.length > 20) {
        // Only add substantial lines to description
        result.description += " " + trimmedLine;
      }
    }
  }

  // Save last section
  if (currentSection && sectionContent.length > 0) {
    const content = sectionContent.join("\n").trim();
    saveSection(currentSection, content, result);
  }

  return result;
}

function saveSection(
  sectionName: string,
  content: string,
  result: ParsedProjectContent,
) {
  const normalizedName = sectionName.toLowerCase();

  switch (normalizedName) {
    case "made with":
      // Parse shields.io badges - they're on a single line separated by &nbsp;
      const badgeMatches = content.match(
        /!\[([^\]]+)\]\(https:\/\/img\.shields\.io[^)]+\)/g,
      );
      if (badgeMatches) {
        result.madeWith = badgeMatches
          .map((badge) => {
            // Extract from alt text (more reliable)
            const altMatch = badge.match(/\[([^\]]+)\]/);
            if (altMatch) {
              // Alt text is usually the technology name
              return altMatch[1].trim();
            }
            // Fallback: extract from URL
            const urlMatch = badge.match(/badge\/-([^-]+)-/);
            if (urlMatch) {
              return urlMatch[1].replace(/_/g, " ");
            }
            return "";
          })
          .filter(Boolean);
      }
      break;
    case "features":
      result.features = content;
      break;
    case "usage":
      result.usage = content;
      break;
    case "configure":
      result.configure = content;
      break;
    case "lessons learned":
      result.lessonsLearned = content;
      break;
    case "reflection":
      result.reflection = content;
      break;
    case "authors":
      result.authors = content;
      break;
    case "acknowledgements":
      result.acknowledgements = content;
      break;
    case "preview":
      // Preview image already handled above
      break;
  }
}
