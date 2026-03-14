import { MetadataRoute } from 'next'
import { projects } from "../components/projects";
import { basicDetails } from "../data/basic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = basicDetails.url;
  const lastModified = new Date().toISOString().split('T')[0];

  // Primary pages
  const routes = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  // Dynamic project pages (using query params as designed in the application)
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/?project=${project.id}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes];
}
