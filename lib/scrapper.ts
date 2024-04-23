import axios from 'axios';
import cheerio from 'cheerio';

type BlogTitle = {
  title: string;
  blogText: string
}

export async function extractTextFromBlog(url: string): Promise<BlogTitle | undefined> {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract text from blog content
    const blogText = $('article').text();
    const title = $('h2').text();

    return { title, blogText };
  } catch (error) {
    console.error('Error extracting text from blog:', error);
    return undefined;
  }
}

export async function targetATagsWithClass(url: string, className: string): Promise<[string[], string?]> {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Select all <a> tags with the specified class and extract their href attributes
    const links: string[] = [];
    $(`a.${className}`).each((index, element) => {
      const href = $(element).attr('href');
      if (href) {
        links.push(href);
      }
    });

    const paginatedLink: string | undefined = $('a.btn').attr('href')

    return [links, paginatedLink];
  } catch (error) {
    console.error(`Error targeting <a> tags with class "${className}":`, error);
    return [[], undefined];
  }
}