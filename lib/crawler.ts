import { BlogDocument, loadBlogToPinecone } from "./embeddings";
import { extractTextFromBlog, targetATagsWithClass } from "./scrapper"
import { removeNewlinesAndTrim } from "./utils";

let plink: string | undefined;
let count: number = 0;
let blogDocuments: BlogDocument[] = []

export const fetchHeyPosts = async (username: string, title: string) => {
  const url: string = `https://world.hey.com`
  const [links, paginatedLink] = await targetATagsWithClass(`${url}/${username}`, "card__link")
  const blogPosts: BlogDocument[] = await Promise.all(links.map(async (link) => {
    const blogResponse = await extractTextFromBlog(`${url}${link}`)
    return { title: removeNewlinesAndTrim(blogResponse!.title), body: removeNewlinesAndTrim(blogResponse!.blogText), url: `${url}${link}` }
  }))
  blogDocuments = [...blogDocuments, ...blogPosts]
  if (count <= 4) {
    count++
    plink = paginatedLink
    await fetchHeyPosts(username, title)
  } else {
    await loadBlogToPinecone(blogDocuments, title)
  }
}
