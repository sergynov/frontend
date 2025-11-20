export const transformComment = (dbComment) => ({
  id: dbComment.id,
  authorId: dbComment.author_id,
  postId: dbComment.post_id,
  publishedAt: dbComment.published_at,
  content: dbComment.content
})