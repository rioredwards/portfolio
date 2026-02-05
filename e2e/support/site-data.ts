import { getAllBlogCards, getBlogWithContent } from '@/lib/blogs';
import { getAllProjectCards, getProjectWithContent } from '@/lib/projects';

export const projectCards = getAllProjectCards();
export const blogCards = getAllBlogCards();

if (projectCards.length === 0) {
  throw new Error('Expected at least one project for e2e tests.');
}

if (blogCards.length === 0) {
  throw new Error('Expected at least one blog for e2e tests.');
}

export const primaryProject = projectCards[0];
export const primaryBlog = blogCards[0];

const primaryProjectDetail = getProjectWithContent(primaryProject.slug);
const primaryBlogDetail = getBlogWithContent(primaryBlog.slug);

if (!primaryProjectDetail) {
  throw new Error(`Missing project detail content for slug ${primaryProject.slug}.`);
}

if (!primaryBlogDetail) {
  throw new Error(`Missing blog detail content for slug ${primaryBlog.slug}.`);
}

export const primaryProjectFrontmatter = primaryProjectDetail.frontmatter;
export const primaryBlogFrontmatter = primaryBlogDetail.frontmatter;
